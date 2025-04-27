import { PetLifeMomentInMemoryRepository } from './PetLifeMomentInMemoryRepository';
import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';

describe('PetLifeMomentInMemoryRepository', () => {
  let repository: PetLifeMomentInMemoryRepository;

  beforeEach(() => {
    repository = new PetLifeMomentInMemoryRepository();
  });

  describe('save', () => {
    it('should save a pet life moment in the repository', async () => {
      // Arrange
      const id = 'test-id';
      const petLifeMoment = PetLifeMoment.create(
        id,
        'Anniversary',
        'pet-id',
        'user-id',
        new Date(),
        'Test description'
      );

      // We need to spy on the Map's set method
      const mapSpy = jest.spyOn(Map.prototype, 'set');

      // Act
      await repository.save(petLifeMoment);

      // Assert
      expect(mapSpy).toHaveBeenCalledWith(id, petLifeMoment);
    });
  });
});