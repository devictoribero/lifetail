import { AddPetCommandHandler } from './AddPetCommandHandler';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { AddPetCommand } from './AddPetCommand';
import { MaxNumberOfPetsReachedException } from '../../domain/exceptions/MaxNumberOfPetsReachedException';
import { faker } from '@faker-js/faker';
import { Species } from '../../domain/entities/PetSpecies';
import { Gender } from 'src/contexts/Lifetails/Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Lifetails/Shared/domain/BooleanValueObject';
import { Pet } from '../../domain/entities/Pet';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { EventBus } from 'src/contexts/Lifetails/Shared/domain/EventBus';
import { DomainEvent } from 'src/contexts/Lifetails/Shared/domain/DomainEvent';
import { PetAddedDomainEvent } from '../../domain/PetAddedDomainEvent';

describe('AddPetCommandHandler', () => {
  let repository: PetInMemoryRepository;
  let commandHandler: AddPetCommandHandler;
  let eventBusMock: EventBus;

  beforeEach(() => {
    eventBusMock = { publish: jest.fn() } as EventBus;
    repository = new PetInMemoryRepository();
    // Mock the save method
    repository.save = jest.fn().mockImplementation(repository.save);
    commandHandler = new AddPetCommandHandler(repository, eventBusMock);
  });

  it('should throw MaxNumberOfPetsReachedException when the owner already has a pet', async () => {
    // Arrange
    const ownerId = faker.string.uuid();
    const pet = new Pet(
      new UUID(faker.string.uuid()),
      Species.Cat,
      new StringValueObject('Neko'),
      Gender.fromPrimitives('Female'),
      new BooleanValueObject(true),
      new DateValueObject(new Date()),
      new DateValueObject(new Date()),
      new UUID(ownerId),
    );
    await repository.save(pet);

    const petId = faker.string.uuid();
    const species = Species.Cat.toString();
    const catName = faker.person.firstName();
    const gender = Gender.Male.toString();
    const sterilized = true;
    const anniversaryDate = new Date();
    const command = new AddPetCommand(
      petId,
      species,
      catName,
      gender,
      sterilized,
      anniversaryDate,
      ownerId,
    );

    await expect(commandHandler.execute(command)).rejects.toThrow(MaxNumberOfPetsReachedException);
  });

  it('should add a pet', async () => {
    // Arrange
    const id = faker.string.uuid();
    const ownerId = faker.string.uuid();
    const species = Species.Cat.toString();
    const catName = faker.person.firstName();
    const gender = Gender.Male.toString();
    const sterilized = true;
    const anniversaryDate = new Date('2025-01-01');
    const command = new AddPetCommand(
      id,
      species,
      catName,
      gender,
      sterilized,
      anniversaryDate,
      ownerId,
    );

    // Act
    await commandHandler.execute(command);

    // Assert
    expect(repository.save).toHaveBeenCalled();
    const savedPet = (repository.save as jest.Mock).mock.calls[0][0];
    expect(savedPet).toBeDefined();
    expect(savedPet.getId().toString()).toBe(id);
    expect(savedPet.getOwnerId()?.toString()).toBe(ownerId);
    expect(savedPet.getSpecies().toString()).toBe(species);
    expect(savedPet.getName().toString()).toBe(catName);
    expect(savedPet.getGender().toString()).toBe(gender);
    expect(savedPet.isSterilized().getValue()).toBe(sterilized);
    expect(savedPet.getAnniversaryDate().toISOString()).toBe(anniversaryDate.toISOString());
    expect(savedPet.getCreatedAt().toISOString()).toBeDefined();
    // check the event bus published the  expected events
    expect(eventBusMock.publish).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          eventName: 'pet.added',
          aggregateId: id,
          eventId: expect.any(String),
          occurredOn: expect.any(Date),
          name: catName,
        }),
      ]),
    );
  });
});
