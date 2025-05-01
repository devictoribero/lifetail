import { Test, TestingModule } from '@nestjs/testing';
import { AddPetLifeMomentMutation } from './AddPetLifeMomentMutation';
import { AddPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/add/AddPetLifeMomentUseCase';
import { AddPetLifeMomentInput } from './AddPetLifeMomentInput';
import { randomUUID } from 'crypto';

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
    it('should call the use case with correct command parameters', async () => {
      // Arrange
      const input: AddPetLifeMomentInput = {
        id: randomUUID(),
        type: 'VeterinaryVisit',
        petId: randomUUID(),
        createdBy: randomUUID(),
        occurredOn: new Date('2023-05-15T10:00:00Z'),
        description: 'Annual checkup, all looking good',
      };

      // Act
      const result = await resolver.addPetLifeMoment(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          id: input.id,
          type: input.type,
          petId: input.petId,
          createdBy: input.createdBy,
          occurredOn: input.occurredOn,
          description: input.description,
        }),
      );
      expect(result).toEqual({ id: input.id });
    });

    it('should propagate errors from the use case', async () => {
      // Arrange
      const input: AddPetLifeMomentInput = {
        id: randomUUID(),
        type: 'InvalidType',
        petId: randomUUID(),
        createdBy: randomUUID(),
        occurredOn: new Date(),
        description: 'Test description',
      };

      const error = new Error('Invalid moment type');
      jest.spyOn(useCase, 'execute').mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.addPetLifeMoment(input)).rejects.toThrow('Invalid moment type');
    });

    it('should handle errors with no message', async () => {
      // Arrange
      const input: AddPetLifeMomentInput = {
        id: randomUUID(),
        type: 'VeterinaryVisit',
        petId: randomUUID(),
        createdBy: randomUUID(),
        occurredOn: new Date(),
        description: 'Test description',
      };

      jest.spyOn(useCase, 'execute').mockRejectedValue({});

      // Act & Assert
      await expect(resolver.addPetLifeMoment(input)).rejects.toThrow(
        'Error adding pet life moment',
      );
    });
  });
});
