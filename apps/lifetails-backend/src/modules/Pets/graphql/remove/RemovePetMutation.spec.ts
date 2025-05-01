import { Test, TestingModule } from '@nestjs/testing';
import { RemovePetMutation } from './RemovePetMutation';
import { RemovePetUseCase } from '../../application/remove/RemovePetUseCase';
import { RemovePetInput } from './RemovePetInput';
import { randomUUID } from 'crypto';

describe('RemovePetMutation', () => {
  let resolver: RemovePetMutation;
  let useCase: RemovePetUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemovePetMutation,
        {
          provide: RemovePetUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    resolver = module.get<RemovePetMutation>(RemovePetMutation);
    useCase = module.get<RemovePetUseCase>(RemovePetUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('removePet', () => {
    it('should call use case and return true on success', async () => {
      // Arrange
      const input: RemovePetInput = {
        id: randomUUID(),
      };

      // Act
      const result = await resolver.removePet(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(expect.objectContaining({ id: input.id }));
      expect(result).toBe(true);
    });

    it('should propagate errors from the use case', async () => {
      // Arrange
      const input: RemovePetInput = {
        id: randomUUID(),
      };

      const error = new Error('Pet not found');
      jest.spyOn(useCase, 'execute').mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.removePet(input)).rejects.toThrow('Pet not found');
    });

    it('should handle errors with no message', async () => {
      // Arrange
      const input: RemovePetInput = {
        id: randomUUID(),
      };

      jest.spyOn(useCase, 'execute').mockRejectedValue({});

      // Act & Assert
      await expect(resolver.removePet(input)).rejects.toThrow('Error removing pet');
    });
  });
});
