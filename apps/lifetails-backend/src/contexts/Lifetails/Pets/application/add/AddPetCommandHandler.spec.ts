import { AddPetCommandHandler } from './AddPetCommandHandler';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { AddPetCommand } from './AddPetCommand';
import { MaxNumberOfPetsReachedException } from '../../domain/exceptions/MaxNumberOfPetsReachedException';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import { Species } from '../../domain/entities/PetSpecies';
import { Gender } from 'src/contexts/Lifetails/Shared/domain/Gender';

describe('AddPetCommandHandler', () => {
  let repository: PetInMemoryRepository;
  let commandHandler: AddPetCommandHandler;

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    commandHandler = new AddPetCommandHandler(repository);
  });

  it('should add a pet', async () => {
    // Arrange
    const id = randomUUID();
    const userId = randomUUID();
    const species = Species.Cat.toString();
    const catName = faker.person.firstName();
    const gender = Gender.Male.toString();
    const chipId = faker.string.uuid();
    const sterilized = true;
    const anniversaryDate = new Date();
    const command = new AddPetCommand(
      id,
      species,
      catName,
      gender,
      chipId,
      sterilized,
      anniversaryDate,
      userId,
    );

    // Act
    await commandHandler.execute(command);

    // Assert
    const pet = await repository.find(id);
    expect(pet).not.toBeNull();
  });

  it('should prevent adding more than one pet for a user', async () => {
    // Arrange
    const userId = randomUUID();
    const petId = randomUUID();
    const species = Species.Cat.toString();
    const catName = faker.person.firstName();
    const gender = Gender.Male.toString();
    const chipId = faker.string.uuid();
    const sterilized = true;
    const anniversaryDate = new Date();
    const command = new AddPetCommand(
      petId,
      species,
      catName,
      gender,
      chipId,
      sterilized,
      anniversaryDate,
      userId,
    );

    await commandHandler.execute(command);

    await expect(commandHandler.execute(command)).rejects.toThrow(MaxNumberOfPetsReachedException);
  });
});
