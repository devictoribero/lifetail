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

describe('AddPetCommandHandler', () => {
  let repository: PetInMemoryRepository;
  let commandHandler: AddPetCommandHandler;

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    commandHandler = new AddPetCommandHandler(repository);
  });

  it.only('should throw MaxNumberOfPetsReachedException when the owner already has a pet', async () => {
    // Arrange
    const ownerId = faker.string.uuid();
    const pet = new Pet(
      faker.string.uuid(),
      Species.Cat,
      new StringValueObject('Neko'),
      Gender.fromPrimitives('Female'),
      new BooleanValueObject(true),
      new DateValueObject(new Date()),
      new DateValueObject(new Date()),
      ownerId,
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
    const anniversaryDate = new Date();
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
    const petId = new UUID(id);
    const pet = await repository.find(petId);
    expect(pet).not.toBeNull();
  });
});
