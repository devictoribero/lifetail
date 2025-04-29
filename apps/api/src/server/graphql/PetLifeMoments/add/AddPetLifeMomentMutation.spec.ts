import { Test, TestingModule } from '@nestjs/testing';
import { AddPetLifeMomentMutation } from './AddPetLifeMomentMutation';
import { AddPetLifeMomentInput } from './AddPetLifeMomentInput';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { AddPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/add/AddPetLifeMomentUseCase';
import { AddPetLifeMomentCommand } from 'src/contexts/PetLifeMoments/application/add/AddPetLifeMomentCommand';

describe('AddPetLifeMomentMutation', () => {
  let resolver: AddPetLifeMomentMutation;
  let useCase: AddPetLifeMomentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddPetLifeMomentMutation,
        {
          provide: AddPetLifeMomentUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    resolver = module.get<AddPetLifeMomentMutation>(AddPetLifeMomentMutation);
    useCase = module.get<AddPetLifeMomentUseCase>(AddPetLifeMomentUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('addPetLifeMoment', () => {
    it('should call use case and return success response', async () => {
      // Arrange
      const momentId = randomUUID();
      const input: AddPetLifeMomentInput = {
        id: momentId,
        type: 'Anniversary',
        petId: randomUUID(),
        createdBy: randomUUID(),
        occurredOn: faker.date.recent(),
        description: faker.lorem.sentence(),
      };

      // Act
      const result = await resolver.addPetLifeMoment(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(
        expect.any(AddPetLifeMomentCommand)
      );

      // Check that the id passed to the command matches the input id
      const commandArg = jest.mocked(useCase.execute).mock.calls[0][0];
      expect(commandArg.id).toBe(momentId);

      expect(result.success).toBe(true);
      expect(result.id).toBe(momentId);
      expect(result.errorMessage).toBeUndefined();
    });

    it('should handle errors and return error response', async () => {
      // Arrange
      const momentId = randomUUID();
      const input: AddPetLifeMomentInput = {
        id: momentId,
        type: 'InvalidType',
        petId: randomUUID(),
        createdBy: randomUUID(),
        occurredOn: faker.date.recent(),
        description: faker.lorem.sentence(),
      };

      const errorMessage = 'Error message';
      jest.spyOn(useCase, 'execute').mockRejectedValue(new Error(errorMessage));

      // Act
      const result = await resolver.addPetLifeMoment(input);

      // Assert
      expect(result.success).toBe(false);
      expect(result.id).toBe('');
      expect(result.errorMessage).toBe(errorMessage);
    });
  });
});