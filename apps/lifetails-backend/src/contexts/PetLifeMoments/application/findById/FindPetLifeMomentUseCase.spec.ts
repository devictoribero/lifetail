import { PetLifeMoment, PetLifeMomentType } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentRepository } from '../../domain/repositories/PetLifeMomentRepository';
import { FindPetLifeMomentQuery } from './FindPetLifeMomentQuery';
import { FindPetLifeMomentUseCase } from './FindPetLifeMomentUseCase';

describe('FindPetLifeMomentUseCase', () => {
  let useCase: FindPetLifeMomentUseCase;
  let repositoryMock: jest.Mocked<PetLifeMomentRepository>;

  const mockPetLifeMoment = new PetLifeMoment(
    '123',
    PetLifeMomentType.Walk,
    'pet-123',
    'user-123',
    new Date('2023-01-01'),
    'A nice walk in the park',
  );

  beforeEach(() => {
    // Create a mock for the repository
    repositoryMock = {
      find: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<PetLifeMomentRepository>;

    useCase = new FindPetLifeMomentUseCase(repositoryMock);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should return a pet life moment when found', async () => {
      // Arrange
      const query = new FindPetLifeMomentQuery('123');
      repositoryMock.find.mockResolvedValue(mockPetLifeMoment);

      // Act
      const result = await useCase.execute(query);

      // Assert
      expect(repositoryMock.find).toHaveBeenCalledWith('123');
      expect(result).toBe(mockPetLifeMoment);
    });

    it('should return null when pet life moment is not found', async () => {
      // Arrange
      const query = new FindPetLifeMomentQuery('non-existent-id');
      repositoryMock.find.mockResolvedValue(null);

      // Act
      const result = await useCase.execute(query);

      // Assert
      expect(repositoryMock.find).toHaveBeenCalledWith('non-existent-id');
      expect(result).toBeNull();
    });

    it('should propagate repository errors', async () => {
      // Arrange
      const query = new FindPetLifeMomentQuery('123');
      const error = new Error('Database error');
      repositoryMock.find.mockRejectedValue(error);

      // Act & Assert
      await expect(useCase.execute(query)).rejects.toThrow('Database error');
      expect(repositoryMock.find).toHaveBeenCalledWith('123');
    });
  });
});
