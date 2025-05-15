import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { DeleteVeterinaryGQLMutation } from './DeleteVeterinaryGQLMutation';
import { DeleteVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinaries/application/DeleteVeterinary/DeleteVeterinaryCommandHandler';
import { DeleteVeterinaryInput } from './DeleteVeterinaryInput';
import { VeterinaryNotFoundException } from 'src/contexts/PetManagement/Veterinaries/domain/exceptions/VeterinaryNotFoundException';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';
import { Reflector } from '@nestjs/core';

describe('DeleteVeterinaryGQLMutation', () => {
  let mutation: DeleteVeterinaryGQLMutation;
  let commandHandler: jest.Mocked<DeleteVeterinaryCommandHandler>;
  let mockContext: any;
  let userId: string;

  beforeEach(async () => {
    // Mock the command handler
    commandHandler = {
      handle: jest.fn(),
    } as unknown as jest.Mocked<DeleteVeterinaryCommandHandler>;

    // Mock user context
    userId = faker.string.uuid();
    mockContext = {
      req: {
        user: { id: userId, accountId: faker.string.uuid() },
        headers: { authorization: 'Bearer some-token' },
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteVeterinaryGQLMutation,
        {
          provide: DeleteVeterinaryCommandHandler,
          useValue: commandHandler,
        },
        {
          provide: Reflector,
          useValue: { getAllAndOverride: jest.fn() },
        },
        {
          provide: AuthenticationRequired,
          useValue: { canActivate: jest.fn().mockResolvedValue(true) },
        },
      ],
    })
      .overrideGuard(AuthenticationRequired)
      .useValue({ canActivate: jest.fn().mockResolvedValue(true) })
      .compile();

    mutation = module.get<DeleteVeterinaryGQLMutation>(DeleteVeterinaryGQLMutation);
  });

  it('should be defined', () => {
    expect(mutation).toBeDefined();
  });

  it('should call command handler and return success response', async () => {
    // Arrange
    const input: DeleteVeterinaryInput = {
      id: faker.string.uuid(),
    };

    // Act
    const result = await mutation.deleteVeterinary(input);

    // Assert
    expect(commandHandler.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        id: input.id,
      }),
    );
    expect(result).toEqual({ id: input.id, success: true });
  });

  it('should throw a specific error when veterinary is not found', async () => {
    // Arrange
    const input: DeleteVeterinaryInput = {
      id: faker.string.uuid(),
    };
    commandHandler.handle.mockRejectedValue(new VeterinaryNotFoundException(input.id));

    // Act & Assert
    await expect(mutation.deleteVeterinary(input)).rejects.toThrow(
      `Veterinary not found: ${input.id}`,
    );
  });

  it('should propagate unexpected errors', async () => {
    // Arrange
    const input: DeleteVeterinaryInput = {
      id: faker.string.uuid(),
    };
    const errorMessage = 'Unexpected error';
    commandHandler.handle.mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(mutation.deleteVeterinary(input)).rejects.toThrow(errorMessage);
  });
});
