import { Test, TestingModule } from '@nestjs/testing';
import { RemovePetLifeMomentMutation } from './RemovePetLifeMomentMutation';
import { randomUUID } from 'crypto';
import { RemovePetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/remove/RemovePetLifeMomentCommandHandler';
import { RemovePetLifeMomentInput } from './RemovePetLifeMomentInput';
describe('RemovePetLifeMomentMutation', () => {
  let resolver: RemovePetLifeMomentMutation;
  let commandHandler: RemovePetLifeMomentCommandHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemovePetLifeMomentMutation,
        {
          provide: RemovePetLifeMomentCommandHandler,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    resolver = module.get<RemovePetLifeMomentMutation>(RemovePetLifeMomentMutation);
    commandHandler = module.get<RemovePetLifeMomentCommandHandler>(
      RemovePetLifeMomentCommandHandler,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('removePetLifeMoment', () => {
    it('should call the command handler', async () => {
      // Arrange
      const input: RemovePetLifeMomentInput = {
        id: randomUUID(),
      };

      // Act
      await resolver.removePetLifeMoment(input);

      // Assert
      expect(commandHandler.execute).toHaveBeenCalled();
    });

    it('should propagate errors', async () => {
      // Arrange
      const input: RemovePetLifeMomentInput = {
        id: randomUUID(),
      };

      const error = new Error('Error message');
      jest.spyOn(commandHandler, 'execute').mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.removePetLifeMoment(input)).rejects.toThrow(error);
    });
  });
});
