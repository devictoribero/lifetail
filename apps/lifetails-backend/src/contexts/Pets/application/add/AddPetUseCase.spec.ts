import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { AddPetUseCase } from './AddPetUseCase';
import { AddPetCommand } from './AddPetCommand';
import { Pet } from '../../domain/entities/Pet';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import { Species } from '../../domain/entities/PetSpecies';

describe('AddPetUseCase', () => {
  let repository: PetInMemoryRepository;
  let useCase: AddPetUseCase;

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    useCase = new AddPetUseCase(repository);
  });

  it('should add a pet', async () => {
    // Arrange
    const saveSpy = jest.spyOn(repository, 'save');
    const id = randomUUID();
    const name = faker.animal.cat();
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const chipId = faker.string.alphanumeric(9);
    const sterilized = faker.datatype.boolean();
    const birthDate = faker.date.past();
    const userId = faker.string.uuid();

    const command = new AddPetCommand(
      id,
      Species.Cat.toString(),
      name,
      gender,
      chipId,
      sterilized,
      birthDate,
      userId,
    );

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
    expect(savedPet.getBirthdate().toDate().getTime()).toBe(birthDate.getTime());
    expect(savedPet.getCreatedAt()).toBeInstanceOf(DateValueObject);
    expect(savedPet.getUserId()).toBe(userId);
  });
});
