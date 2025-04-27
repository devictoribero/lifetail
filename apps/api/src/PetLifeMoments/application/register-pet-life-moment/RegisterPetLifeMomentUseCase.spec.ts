import { RegisterPetLifeMomentUseCase } from './RegisterPetLifeMomentUseCase';
import { PetLifeMomentInMemoryRepository } from '../../infrastructure/persistence/PetLifeMomentInMemoryRepository';
import { RegisterPetLifeMomentCommand } from './RegisterPetLifeMomentCommand';
import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';

jest.mock('../../infrastructure/Persistence/PetLifeMomentInMemoryRepository');

describe('RegisterPetLifeMomentUseCase', () => {
  let useCase: RegisterPetLifeMomentUseCase;
  let repository: jest.Mocked<PetLifeMomentInMemoryRepository>;

  beforeEach(() => {
    repository =
      new PetLifeMomentInMemoryRepository() as jest.Mocked<PetLifeMomentInMemoryRepository>;
    useCase = new RegisterPetLifeMomentUseCase(repository);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should create a pet life moment and save it to the repository', async () => {
    // Arrange
    const command = new RegisterPetLifeMomentCommand(
      'test-id',
      'Anniversary',
      'pet-id',
      'user-id',
      new Date(),
      'Test description',
    );

    // Mock the save method
    repository.save = jest.fn().mockResolvedValue(undefined);

    // Act
    await useCase.execute(command);

    // Assert
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(expect.any(PetLifeMoment));
  });

  it('should throw an error when an invalid event type is provided', async () => {
    // Arrange
    const command = new RegisterPetLifeMomentCommand(
      'test-id',
      'InvalidType',
      'pet-id',
      'user-id',
      new Date(),
      'Test description',
    );

    // Act & Assert
    await expect(useCase.execute(command)).rejects.toThrow();
  });
});
