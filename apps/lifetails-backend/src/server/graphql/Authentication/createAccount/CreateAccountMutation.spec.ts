import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { CreateAccountMutation } from './CreateAccountMutation';
import { CreateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountCommandHandler';
import { CreateAccountInput } from './CreateAccountInput';
import { EmailAlreadyInUseException } from 'src/contexts/Lifetails/Authentication/domain/exceptions/EmailAlreadyInUseException';
import { Account } from 'src/contexts/Lifetails/Authentication/domain/entities/Account';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';

describe('CreateAccountMutation', () => {
  let mockedId: string;
  let mutation: CreateAccountMutation;
  let commandHandler: CreateAccountCommandHandler;

  beforeEach(async () => {
    mockedId = faker.string.uuid();
    const mockAccount = {
      getId: () => new UUID(mockedId),
    } as unknown as Account;

    // Create mock command handler with Jest
    const mockCommandHandler = {
      execute: jest.fn().mockResolvedValue(mockAccount),
    } as unknown as CreateAccountCommandHandler;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountMutation,
        {
          provide: CreateAccountCommandHandler,
          useValue: mockCommandHandler,
        },
      ],
    }).compile();

    mutation = module.get<CreateAccountMutation>(CreateAccountMutation);
    commandHandler = module.get<CreateAccountCommandHandler>(CreateAccountCommandHandler);
  });

  it('should throw error when email is already in use', async () => {
    // Arrange
    const input: CreateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    commandHandler.execute = jest.fn().mockRejectedValue(new EmailAlreadyInUseException());

    // Act & Assert
    await expect(mutation.createAccount(input)).rejects.toThrow(
      'This email is already registered.',
    );
    expect(commandHandler.execute).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
    });
  });

  it('should throw error when an unexpected error occurs', async () => {
    // Arrange
    const input: CreateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const errorMessage = 'Unexpected error';

    commandHandler.execute = jest.fn().mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(mutation.createAccount(input)).rejects.toThrow(errorMessage);
    expect(commandHandler.execute).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
    });
  });

  it('should create an account', async () => {
    // Arrange
    const input: CreateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    // Act
    await mutation.createAccount(input);

    // Assert
    expect(commandHandler.execute).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
    });
  });
});
