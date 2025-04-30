import { PetLifeMomentInMemoryRepository } from '../../infrastructure/PetLifeMomentInMemoryRepository';
import { RemovePetLifeMomentUseCase } from './RemovePetLifeMomentUseCase';
import { RemovePetLifeMomentCommand } from './RemovePetLifeMomentCommand';
import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { randomUUID } from 'node:crypto';
import { PetLifeMomentType } from '../../domain/entities/PetLifeMomentType';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

describe('RemovePetLifeMomentUseCase', () => {
  let repository: PetLifeMomentInMemoryRepository;
  let useCase: RemovePetLifeMomentUseCase;

  beforeEach(() => {
    repository = new PetLifeMomentInMemoryRepository();
    useCase = new RemovePetLifeMomentUseCase(repository);
  });

  it('should remove a pet life moment by id', async () => {
    // Arrange
    const id = randomUUID();
    const type = 'VeterinaryVisit';
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = new Date('2023-05-15T10:00:00Z');
    const description = 'Annual checkup, all looking good';
    // Create and save a pet life moment
    const petLifeMoment = PetLifeMoment.create(
      id,
      PetLifeMomentType.fromPrimitives(type),
      petId,
      createdBy,
      occurredOn,
      new StringValueObject(description),
    );
    await repository.save(petLifeMoment);
    // Verify the pet life moment exists before removal
    const beforeRemoval = await repository.find(id);
    expect(beforeRemoval).not.toBeNull();
    const removeSpy = jest.spyOn(repository, 'remove');
    const command = new RemovePetLifeMomentCommand(id);

    // Act
    await useCase.execute(command);

    // Assert
    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledWith(id);
    // Verify the pet life moment no longer exists
    const afterRemoval = await repository.find(id);
    expect(afterRemoval).toBeNull();
  });

  it('should not throw an error when removing a non-existent moment', async () => {
    // Arrange
    const nonExistentId = randomUUID();
    const command = new RemovePetLifeMomentCommand(nonExistentId);

    // Act & Assert
    await expect(useCase.execute(command)).resolves.not.toThrow();
  });
});
