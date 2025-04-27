import { Test, TestingModule } from '@nestjs/testing';
import { RegisterPetLifeMomentMutation } from './RegisterPetLifeMomentMutation';
import { RegisterPetLifeMomentUseCase } from '../../../application/register-pet-life-moment/RegisterPetLifeMomentUseCase';
import { RegisterPetLifeMomentInput } from '../types/RegisterPetLifeMomentInput';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';

describe('RegisterPetLifeMomentMutation', () => {
  let resolver: RegisterPetLifeMomentMutation;
  let useCase: RegisterPetLifeMomentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterPetLifeMomentMutation,
        {
          provide: RegisterPetLifeMomentUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    resolver = module.get<RegisterPetLifeMomentMutation>(RegisterPetLifeMomentMutation);
    useCase = module.get<RegisterPetLifeMomentUseCase>(RegisterPetLifeMomentUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('registerPetLifeMoment', () => {
    it('should call use case and return success response', async () => {
      // Arrange
      const input: RegisterPetLifeMomentInput = {
        eventType: 'Anniversary',
        petId: randomUUID(),
        createdBy: randomUUID(),
        occurredOn: faker.date.recent(),
        description: faker.lorem.sentence(),
      };

      // Act
      const result = await resolver.registerPetLifeMoment(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalled();
      expect(result.success).toBe(true);
      expect(result.id).toBeDefined();
      expect(result.errorMessage).toBeUndefined();
    });

    it('should handle errors and return error response', async () => {
      // Arrange
      const input: RegisterPetLifeMomentInput = {
        eventType: 'InvalidType',
        petId: randomUUID(),
        createdBy: randomUUID(),
        occurredOn: faker.date.recent(),
        description: faker.lorem.sentence(),
      };

      const errorMessage = 'Error message';
      jest.spyOn(useCase, 'execute').mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await resolver.registerPetLifeMoment(input);

      // Assert
      expect(result.success).toBe(false);
      expect(result.id).toBe('');
      expect(result.errorMessage).toBe(errorMessage);
    });
  });
});
