import { AddPetCommandHandler } from './AddPetCommandHandler';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { AddPetCommand } from './AddPetCommand';
import { MaxNumberOfPetsReachedException } from '../../domain/exceptions/MaxNumberOfPetsReachedException';
import { faker } from '@faker-js/faker';
import { Species } from '../../domain/entities/PetSpecies';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { Pet } from '../../domain/entities/Pet';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { EventBus } from 'src/contexts/Shared/domain/EventBus';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { PetObjectMother } from '../../domain/entities/PetObjectMother.spec';

describe('AddPetCommandHandler', () => {
  let repository: jest.Mocked<PetRepository>;
  let commandHandler: AddPetCommandHandler;
  let eventBusMock: EventBus;

  beforeEach(() => {
    eventBusMock = { publish: jest.fn() } as EventBus;
    repository = {
      save: jest.fn(),
      find: jest.fn(),
      findByOwner: jest.fn(),
    } as jest.Mocked<PetRepository>;
    // Mock the save method
    repository.save = jest.fn().mockImplementation(repository.save);
    commandHandler = new AddPetCommandHandler(repository, eventBusMock);
  });

  it('should throw MaxNumberOfPetsReachedException when the owner already has a pet', async () => {
    // Arrange
    const pet = PetObjectMother.create();
    const ownerId = pet.getOwnerId().toString();
    repository.findByOwner.mockResolvedValue([pet]);
    const petId = pet.getId().toString();
    const species = pet.getSpecies().toString();
    const catName = pet.getName().toString();
    const gender = pet.getGender().toString();
    const sterilized = pet.isSterilized().getValue();
    const birthDate = pet.getBirthDate().toDate();
    const arrivalDate = pet.getArrivalDate().toDate();
    const color = pet.getColor().toString();

    const command = new AddPetCommand(
      petId,
      species,
      catName,
      gender,
      sterilized,
      birthDate,
      arrivalDate,
      color,
      ownerId,
    );

    await expect(commandHandler.handle(command)).rejects.toThrow(MaxNumberOfPetsReachedException);
  });

  it.only('should add a pet', async () => {
    const pet = PetObjectMother.create();
    const ownerId = pet.getOwnerId().toString();
    repository.findByOwner.mockResolvedValue([]);
    // Arrange
    const id = pet.getId().toString();
    const species = pet.getSpecies().toString();
    const catName = pet.getName().toString();
    const gender = pet.getGender().toString();
    const sterilized = pet.isSterilized().getValue();
    const birthDate = pet.getBirthDate().toDate();
    const arrivalDate = pet.getArrivalDate().toDate();
    const color = pet.getColor().toString();
    const command = new AddPetCommand(
      id,
      species,
      catName,
      gender,
      sterilized,
      birthDate,
      arrivalDate,
      color,
      ownerId,
    );

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(repository.save).toHaveBeenCalledWith({
      id: pet.getId(),
      ownerId: pet.getOwnerId(),
      species: pet.getSpecies(),
      name: pet.getName(),
      gender: pet.getGender(),
      sterilized: pet.isSterilized(),
      birthDate: pet.getBirthDate(),
      arrivalDate: pet.getArrivalDate(),
      color: pet.getColor(),
      createdAt: expect.any(DateValueObject),
      microchipNumber: null,
      image: null,
      updatedAt: null,
      deletedAt: null,
      domainEvents: [],
    });
    expect(eventBusMock.publish).toHaveBeenCalledWith([
      expect.objectContaining({
        eventName: 'pet.added',
        aggregateId: id,
        eventId: expect.any(String),
        occurredOn: expect.any(Date),
        name: catName,
      }),
    ]);
  });
});
