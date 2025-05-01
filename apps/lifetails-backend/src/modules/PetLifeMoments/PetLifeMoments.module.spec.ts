import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { PetLifeMomentsModule } from 'src/modules/PetLifeMoments/PetLifeMoments.module';
import { PetLifeMomentInMemoryRepository } from 'src/modules/PetLifeMoments/infrastructure/PetLifeMomentInMemoryRepository';
import { AddPetLifeMomentUseCase } from 'src/modules/PetLifeMoments/application/add/AddPetLifeMomentUseCase';
import { AddPetLifeMomentCommand } from 'src/modules/PetLifeMoments/application/add/AddPetLifeMomentCommand';
import { UpdatePetLifeMomentUseCase } from 'src/modules/PetLifeMoments/application/update/UpdatePetLifeMomentUseCase';
import { UpdatePetLifeMomentCommand } from 'src/modules/PetLifeMoments/application/update/UpdatePetLifeMomentCommand';
import { FindPetLifeMomentUseCase } from 'src/modules/PetLifeMoments/application/find/FindPetLifeMomentUseCase';
import { FindPetLifeMomentQuery } from 'src/modules/PetLifeMoments/application/find/FindPetLifeMomentQuery';
import { PetLifeMoment } from 'src/modules/PetLifeMoments/domain/entities/PetLifeMoment';
import { PetLifeMomentType } from 'src/modules/PetLifeMoments/domain/entities/PetLifeMomentType';
import { StringValueObject } from 'src/modules/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/modules/Shared/domain/DateValueObject';

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

    it('should properly resolve the add use case', async () => {
      // Arrange & Act
      const moduleRef = await Test.createTestingModule({
        imports: [PetLifeMomentsModule],
      }).compile();

      // Assert
      const useCase = moduleRef.get<AddPetLifeMomentUseCase>(AddPetLifeMomentUseCase);
      expect(useCase).toBeDefined();
      expect(useCase).toBeInstanceOf(AddPetLifeMomentUseCase);
    });

    it('should properly resolve the update use case', async () => {
      // Arrange & Act
      const moduleRef = await Test.createTestingModule({
        imports: [PetLifeMomentsModule],
      }).compile();

      // Assert
      const useCase = moduleRef.get<UpdatePetLifeMomentUseCase>(UpdatePetLifeMomentUseCase);
      expect(useCase).toBeDefined();
      expect(useCase).toBeInstanceOf(UpdatePetLifeMomentUseCase);
    });

    it('should properly resolve the find use case', async () => {
      // Arrange & Act
      const moduleRef = await Test.createTestingModule({
        imports: [PetLifeMomentsModule],
      }).compile();

      // Assert
      const useCase = moduleRef.get<FindPetLifeMomentUseCase>(FindPetLifeMomentUseCase);
      expect(useCase).toBeDefined();
      expect(useCase).toBeInstanceOf(FindPetLifeMomentUseCase);
    });

    it('should properly inject dependencies into the add use case', async () => {
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

      const command = new AddPetLifeMomentCommand(
        id,
        'Anniversary',
        petId,
        createdBy,
        occurredOn,
        description,
      );
      await useCase.execute(command);

      // Assert
      expect(repository.save).toHaveBeenCalled();
    });

    it('should properly inject dependencies into the update use case', async () => {
      // Arrange & Act
      const moduleRef = await Test.createTestingModule({
        imports: [PetLifeMomentsModule],
      }).compile();

      const useCase = moduleRef.get<UpdatePetLifeMomentUseCase>(UpdatePetLifeMomentUseCase);
      const repository = moduleRef.get<PetLifeMomentInMemoryRepository>(
        PetLifeMomentInMemoryRepository,
      );

      // Create a pet life moment in the repository
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.fromPrimitives('Anniversary'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      // Mock the repository's find and save methods
      jest.spyOn(repository, 'find').mockResolvedValue(petLifeMoment);
      jest.spyOn(repository, 'save').mockResolvedValue();

      // Create an update command with new description
      const newDescription = faker.lorem.sentence();
      const command = new UpdatePetLifeMomentCommand(id, newDescription);

      await useCase.execute(command);

      // Assert
      expect(repository.find).toHaveBeenCalledWith(id);
      expect(repository.save).toHaveBeenCalled();
    });

    it('should properly inject dependencies into the find use case', async () => {
      // Arrange & Act
      const moduleRef = await Test.createTestingModule({
        imports: [PetLifeMomentsModule],
      }).compile();

      const useCase = moduleRef.get<FindPetLifeMomentUseCase>(FindPetLifeMomentUseCase);
      const repository = moduleRef.get<PetLifeMomentInMemoryRepository>(
        PetLifeMomentInMemoryRepository,
      );

      // Create a pet life moment in the repository
      const petLifeMoment = PetLifeMoment.create(
        id,
        PetLifeMomentType.fromPrimitives('Anniversary'),
        petId,
        createdBy,
        new DateValueObject(occurredOn),
        new StringValueObject(description),
      );

      // Mock the repository's find method
      jest.spyOn(repository, 'find').mockResolvedValue(petLifeMoment);

      // Create a find query
      const query = new FindPetLifeMomentQuery(id);

      const result = await useCase.execute(query);

      // Assert
      expect(repository.find).toHaveBeenCalledWith(id);
      expect(result).toBe(petLifeMoment);
    });
  });
});
