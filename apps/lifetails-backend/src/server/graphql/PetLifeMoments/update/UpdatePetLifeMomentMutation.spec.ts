import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePetLifeMomentMutation } from './UpdatePetLifeMomentMutation';
import { randomUUID } from 'crypto';
import { UpdatePetLifeMomentUseCase } from 'src/contexts/Lifetails/PetLifeMoments/application/update/UpdatePetLifeMomentUseCase';
import { UpdatePetLifeMomentInput } from './UpdatePetLifeMomentInput';
import { faker } from '@faker-js/faker';

describe('UpdatePetLifeMomentMutation', () => {
  let resolver: UpdatePetLifeMomentMutation;
  let useCase: UpdatePetLifeMomentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePetLifeMomentMutation,
        {
          provide: UpdatePetLifeMomentUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    resolver = module.get<UpdatePetLifeMomentMutation>(UpdatePetLifeMomentMutation);
    useCase = module.get<UpdatePetLifeMomentUseCase>(UpdatePetLifeMomentUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('updatePetLifeMoment', () => {
    it('should call use case with all fields', async () => {
      // Arrange
      const id = randomUUID();
      const input: UpdatePetLifeMomentInput = {
        id,
        description: faker.lorem.sentence(),
        occurredOn: faker.date.recent(),
        petId: randomUUID(),
      };

      // Act
      const result = await resolver.updatePetLifeMoment(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          id: input.id,
          description: input.description,
          occurredOn: input.occurredOn,
          petId: input.petId,
        }),
      );
      expect(result).toEqual({ id });
    });

    it('should call use case with only description', async () => {
      // Arrange
      const id = randomUUID();
      const input: UpdatePetLifeMomentInput = {
        id,
        description: faker.lorem.sentence(),
      };

      // Act
      await resolver.updatePetLifeMoment(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          id: input.id,
          description: input.description,
          occurredOn: undefined,
          petId: undefined,
        }),
      );
    });

    it('should call use case with only occurredOn', async () => {
      // Arrange
      const id = randomUUID();
      const occurredOn = faker.date.recent();
      const input: UpdatePetLifeMomentInput = {
        id,
        occurredOn,
      };

      // Act
      await resolver.updatePetLifeMoment(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          id: input.id,
          description: undefined,
          occurredOn,
          petId: undefined,
        }),
      );
    });

    it('should call use case with only petId', async () => {
      // Arrange
      const id = randomUUID();
      const petId = randomUUID();
      const input: UpdatePetLifeMomentInput = {
        id,
        petId,
      };

      // Act
      await resolver.updatePetLifeMoment(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          id: input.id,
          description: undefined,
          occurredOn: undefined,
          petId,
        }),
      );
    });

    it('should propagate errors', async () => {
      // Arrange
      const input: UpdatePetLifeMomentInput = {
        id: randomUUID(),
        description: faker.lorem.sentence(),
      };

      const error = new Error('Error message');
      jest.spyOn(useCase, 'execute').mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.updatePetLifeMoment(input)).rejects.toThrow(error);
    });
  });
});
