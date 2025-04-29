import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { PetLifeMomentsModule } from './PetLifeMoments.module';
import { PetLifeMomentInMemoryRepository } from 'src/contexts/PetLifeMoments/infrastructure/PetLifeMomentInMemoryRepository';
import { AddPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/add-pet-life-moment/AddPetLifeMomentUseCase';
import { AddPetLifeMomentCommand } from 'src/contexts/PetLifeMoments/application/add-pet-life-moment/AddPetLifeMomentCommand';

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
      const useCase = moduleRef.get<AddPetLifeMomentUseCase>(AddPetLifeMomentUseCase);
      expect(useCase).toBeDefined();
      expect(useCase).toBeInstanceOf(AddPetLifeMomentUseCase);
    });

    it('should properly inject dependencies into the use case', async () => {
      // Arrange & Act
      const moduleRef = await Test.createTestingModule({
        imports: [PetLifeMomentsModule],
      }).compile();

      const useCase = moduleRef.get<AddPetLifeMomentUseCase>(AddPetLifeMomentUseCase);
      const repository = moduleRef.get<PetLifeMomentInMemoryRepository>(
        PetLifeMomentInMemoryRepository,
      );

      // Create a spy on the repository's save method to verify it's called
      jest.spyOn(repository, 'save').mockResolvedValue();

      const command = new AddPetLifeMomentCommand(id, 'Anniversary', petId, createdBy, occurredOn, description);
      await useCase.execute(command);

      // Assert
      expect(repository.save).toHaveBeenCalled();
    });
  });
});
