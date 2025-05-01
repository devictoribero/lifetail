import { Test, TestingModule } from '@nestjs/testing';
import { RemovePetLifeMomentMutation } from './RemovePetLifeMomentMutation';
import { randomUUID } from 'crypto';
import { RemovePetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/remove/RemovePetLifeMomentUseCase';
import { RemovePetLifeMomentInput } from './RemovePetLifeMomentInput';
describe('RemovePetLifeMomentMutation', () => {
  let resolver: RemovePetLifeMomentMutation;
  let useCase: RemovePetLifeMomentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemovePetLifeMomentMutation,
        {
          provide: RemovePetLifeMomentUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    resolver = module.get<RemovePetLifeMomentMutation>(RemovePetLifeMomentMutation);
    useCase = module.get<RemovePetLifeMomentUseCase>(RemovePetLifeMomentUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('removePetLifeMoment', () => {
    it('should call use case', async () => {
      // Arrange
      const input: RemovePetLifeMomentInput = {
        id: randomUUID(),
      };

      // Act
      await resolver.removePetLifeMoment(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalled();
    });

    it('should propagate errors', async () => {
      // Arrange
      const input: RemovePetLifeMomentInput = {
        id: randomUUID(),
      };

      const error = new Error('Error message');
      jest.spyOn(useCase, 'execute').mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.removePetLifeMoment(input)).rejects.toThrow(error);
    });
  });
});