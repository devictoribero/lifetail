import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { RemovePetUseCase } from './RemovePetUseCase';
import { RemovePetCommand } from './RemovePetCommand';
import { Pet } from '../../domain/entities/Pet';
import { randomUUID } from 'node:crypto';
import { Gender } from '../../../Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';

describe('RemovePetUseCase', () => {
  let repository: PetInMemoryRepository;
  let useCase: RemovePetUseCase;

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    useCase = new RemovePetUseCase(repository);
  });

  it('should throw a PetNotFoundException when the pet does not exist', async () => {
    // Arrange
    const nonExistentId = randomUUID();
    const command = new RemovePetCommand(nonExistentId);

    await expect(useCase.execute(command)).rejects.toThrow(PetNotFoundException);
  });

  it('should remove a pet', async () => {
    // Arrange
    const id = randomUUID();
    const name = faker.animal.cat();
    const gender = 'Female';
    const chipId = faker.string.numeric(9);
    const sterilized = faker.datatype.boolean();
    const birthDate = faker.date.past();
    const userId = faker.string.uuid();
    // Create and save a pet
    const pet = Pet.create(
      id,
      new StringValueObject(name),
      Gender.fromPrimitives(gender),
      new StringValueObject(chipId),
      new BooleanValueObject(sterilized),
      new DateValueObject(birthDate),
      userId,
    );
    await repository.save(pet);
    // Verify the pet exists before removal
    const beforeRemoval = await repository.find(id);
    expect(beforeRemoval).not.toBeNull();
    const removeSpy = jest.spyOn(repository, 'remove');
    const command = new RemovePetCommand(id);

    // Act
    await useCase.execute(command);

    // Assert
    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledWith(id);
    // Verify the pet no longer exists
    const afterRemoval = await repository.find(id);
    expect(afterRemoval).toBeNull();
  });
});
