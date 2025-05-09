import { Test, TestingModule } from '@nestjs/testing';
import { AddPetLifeMomentMutation } from './AddPetLifeMomentMutation';
import { AddPetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/add/AddPetLifeMomentCommandHandler';
import { AddPetLifeMomentInput } from './AddPetLifeMomentInput';
import { randomUUID } from 'crypto';

describe('AddPetLifeMomentMutation', () => {
  let resolver: AddPetLifeMomentMutation;
  let commandHandler: AddPetLifeMomentCommandHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddPetLifeMomentMutation,
        {
          provide: AddPetLifeMomentCommandHandler,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    resolver = module.get<AddPetLifeMomentMutation>(AddPetLifeMomentMutation);
    commandHandler = module.get<AddPetLifeMomentCommandHandler>(AddPetLifeMomentCommandHandler);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
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
    jest.spyOn(commandHandler, 'execute').mockRejectedValue(error);

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

    jest.spyOn(commandHandler, 'execute').mockRejectedValue({});

    // Act & Assert
    await expect(resolver.addPetLifeMoment(input)).rejects.toThrow('Error adding pet life moment');
  });

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
    expect(commandHandler.execute).toHaveBeenCalledWith(
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
});
