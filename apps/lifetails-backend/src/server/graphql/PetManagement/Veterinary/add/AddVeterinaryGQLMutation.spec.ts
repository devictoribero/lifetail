import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { AddVeterinaryGQLMutation } from './AddVeterinaryGQLMutation';
import { AddVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinary/application/add/AddVeterinaryCommandHandler';
import { AddVeterinaryInput } from './AddVeterinaryInput';
import { VeterinaryNameTooShortException } from 'src/contexts/PetManagement/Veterinary/domain/exceptions/VeterinaryNameTooShortException';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';
import { Reflector } from '@nestjs/core';

describe('AddVeterinaryGQLMutation', () => {
  let mutation: AddVeterinaryGQLMutation;
  let commandHandler: jest.Mocked<AddVeterinaryCommandHandler>;
  let mockContext: any;
  let userId: string;

  beforeEach(async () => {
    // Mock the command handler
    commandHandler = {
      handle: jest.fn(),
    } as unknown as jest.Mocked<AddVeterinaryCommandHandler>;

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
        AddVeterinaryGQLMutation,
        {
          provide: AddVeterinaryCommandHandler,
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

    mutation = module.get<AddVeterinaryGQLMutation>(AddVeterinaryGQLMutation);
  });

  it('should be defined', () => {
    expect(mutation).toBeDefined();
  });

  it('should call command handler and return veterinary id', async () => {
    // Arrange
    const input: AddVeterinaryInput = {
      id: faker.string.uuid(),
      name: faker.company.name(),
    };

    // Act
    const result = await mutation.addVeterinary(input);

    // Assert
    expect(commandHandler.handle).toHaveBeenCalledWith(
      expect.objectContaining({
        id: input.id,
        name: input.name,
      }),
    );
    expect(result).toEqual({ id: input.id });
  });

  it('should throw a specific error when veterinary name is too short', async () => {
    // Arrange
    const input: AddVeterinaryInput = {
      id: faker.string.uuid(),
      name: 'AB', // Name too short (less than 3 characters)
    };
    commandHandler.handle.mockRejectedValue(new VeterinaryNameTooShortException());

    // Act & Assert
    await expect(mutation.addVeterinary(input)).rejects.toThrow(
      'Veterinary name must have at least 3 characters',
    );
  });

  it('should propagate unexpected errors', async () => {
    // Arrange
    const input: AddVeterinaryInput = {
      id: faker.string.uuid(),
      name: faker.company.name(),
    };
    const errorMessage = 'Unexpected error';
    commandHandler.handle.mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(mutation.addVeterinary(input)).rejects.toThrow(errorMessage);
  });
});
