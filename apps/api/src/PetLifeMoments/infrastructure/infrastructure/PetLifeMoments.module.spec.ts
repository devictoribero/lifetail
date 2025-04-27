import { Test } from '@nestjs/testing';
import { PetLifeMomentsModule } from './PetLifeMoments.module';
import { RegisterPetLifeMomentUseCase } from '../../application/register-pet-life-moment/RegisterPetLifeMomentUseCase';
import { PetLifeMomentInMemoryRepository } from '../Persistence/PetLifeMomentInMemoryRepository';

describe('PetLifeMomentsModule', () => {
  describe('when module is instantiated', () => {
    it('should properly resolve the repository', async () => {
      // Arrange & Act
      const moduleRef = await Test.createTestingModule({
        imports: [PetLifeMomentsModule],
      }).compile();

      // Assert
      const repository = moduleRef.get<PetLifeMomentInMemoryRepository>(
        PetLifeMomentInMemoryRepository,
      );
      expect(repository).toBeDefined();
      expect(repository).toBeInstanceOf(PetLifeMomentInMemoryRepository);
    });

    it('should properly resolve the use case', async () => {
      // Arrange & Act
      const moduleRef = await Test.createTestingModule({
        imports: [PetLifeMomentsModule],
      }).compile();

      // Assert
      const useCase = moduleRef.get<RegisterPetLifeMomentUseCase>(RegisterPetLifeMomentUseCase);
      expect(useCase).toBeDefined();
      expect(useCase).toBeInstanceOf(RegisterPetLifeMomentUseCase);
    });

    it('should properly inject dependencies into the use case', async () => {
      // Arrange & Act
      const moduleRef = await Test.createTestingModule({
        imports: [PetLifeMomentsModule],
      }).compile();

      const useCase = moduleRef.get<RegisterPetLifeMomentUseCase>(RegisterPetLifeMomentUseCase);
      const repository = moduleRef.get<PetLifeMomentInMemoryRepository>(
        PetLifeMomentInMemoryRepository,
      );

      // Create a spy on the repository's save method to verify it's called
      jest.spyOn(repository, 'save').mockResolvedValue();

      // Execute the use case with a command
      await useCase.execute({
        id: 'test-id',
        eventType: 'Anniversary',
        petId: 'pet-id',
        createdBy: 'user-id',
        occurredOn: new Date(),
        description: 'Test description',
      });

      // Assert
      expect(repository.save).toHaveBeenCalled();
    });
  });
});
