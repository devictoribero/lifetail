import { Test, TestingModule } from '@nestjs/testing';
import { RemovePetMutation } from './RemovePetMutation';
import { RemovePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetCommandHandler';
import { RemovePetInput } from './RemovePetInput';
import { randomUUID } from 'crypto';

describe('RemovePetMutation', () => {
  let resolver: RemovePetMutation;
  let commandHandler: RemovePetCommandHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemovePetMutation,
        {
          provide: RemovePetCommandHandler,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    resolver = module.get<RemovePetMutation>(RemovePetMutation);
    commandHandler = module.get<RemovePetCommandHandler>(RemovePetCommandHandler);
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
      expect(commandHandler.execute).toHaveBeenCalledWith(
        expect.objectContaining({ id: input.id }),
      );
      expect(result).toBe(true);
    });

    it('should propagate errors from the use case', async () => {
      // Arrange
      const input: RemovePetInput = {
        id: randomUUID(),
      };

      const error = new Error('Pet not found');
      jest.spyOn(commandHandler, 'execute').mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.removePet(input)).rejects.toThrow('Pet not found');
    });

    it('should handle errors with no message', async () => {
      // Arrange
      const input: RemovePetInput = {
        id: randomUUID(),
      };

      jest.spyOn(commandHandler, 'execute').mockRejectedValue({});

      // Act & Assert
      await expect(resolver.removePet(input)).rejects.toThrow('Error removing pet');
    });
  });
});
