import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { AddPetUseCase } from './AddPetUseCase';
import { AddPetCommand } from './AddPetCommand';
import { Pet } from '../../domain/entities/Pet';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';

describe('AddPetUseCase', () => {
  let repository: PetInMemoryRepository;
  let useCase: AddPetUseCase;

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    useCase = new AddPetUseCase(repository);
  });

  it('should create and save a pet', async () => {
    // Arrange
    const saveSpy = jest.spyOn(repository, 'save');
    const id = randomUUID();
    const name = faker.animal.cat();
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const chipId = faker.string.alphanumeric(9);
    const sterilized = faker.datatype.boolean();
    const birthdate = faker.date.past();

    const command = new AddPetCommand(id, name, gender, chipId, sterilized, birthdate);

    // Act
    await useCase.execute(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);

    // Verify the repository was called with the correct Pet entity
    const savedPet = saveSpy.mock.calls[0][0] as Pet;
    expect(savedPet).toBeInstanceOf(Pet);
    expect(savedPet.getId()).toBe(id);
    expect(savedPet.getName().toString()).toBe(name);
    expect(savedPet.getGender().toString()).toBe(gender);
    expect(savedPet.getChipId().toString()).toBe(chipId);
    expect(savedPet.isSterilized().getValue()).toBe(sterilized);
    expect(savedPet.getBirthdate().toDate().getTime()).toBe(birthdate.getTime());
    expect(savedPet.getCreatedAt()).toBeInstanceOf(DateValueObject);
    expect(savedPet.getUpdatedAt()).toBeNull();
  });

  it('should create pets with different generated values in each test run', async () => {
    // Arrange
    const saveSpy = jest.spyOn(repository, 'save');
    const id = randomUUID();
    const name = faker.animal.cat();
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const chipId = faker.string.alphanumeric(9);
    const sterilized = faker.datatype.boolean();
    const birthdate = faker.date.past();

    const command = new AddPetCommand(id, name, gender, chipId, sterilized, birthdate);

    // Act
    await useCase.execute(command);

    // Assert - we don't need to verify specific values here
    // This test is mainly to demonstrate that a different test run
    // will use different random values
    expect(saveSpy).toHaveBeenCalledTimes(1);
    const savedPet = saveSpy.mock.calls[0][0] as Pet;
    expect(savedPet).toBeInstanceOf(Pet);
    expect(savedPet.getCreatedAt()).toBeInstanceOf(DateValueObject);
    expect(savedPet.getUpdatedAt()).toBeNull();
  });
});
