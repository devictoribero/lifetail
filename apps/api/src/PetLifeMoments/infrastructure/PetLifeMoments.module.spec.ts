import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { PetLifeMomentsModule } from './PetLifeMoments.module';
import { RegisterPetLifeMomentUseCase } from '../application/register-pet-life-moment/RegisterPetLifeMomentUseCase';
import { PetLifeMomentInMemoryRepository } from './persistence/PetLifeMomentInMemoryRepository';

describe('PetLifeMomentsModule', () => {
  let id: string;
  let petId: string;
  let createdBy: string;
  let occurredOn: Date;
  let description: string;

  beforeEach(() => {
    id = randomUUID();
    petId = randomUUID();
    createdBy = randomUUID();
    occurredOn = faker.date.recent();
    description = faker.lorem.sentence();
  });

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
        id,
        eventType: 'Anniversary',
        petId,
        createdBy,
        occurredOn,
        description,
      });

      // Assert
      expect(repository.save).toHaveBeenCalled();
    });
  });
});
