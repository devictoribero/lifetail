import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { CreateAccountMutation } from './CreateAccountMutation';
import { CreateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountCommandHandler';
import { CreateAccountInput } from './CreateAccountInput';
import { EmailAlreadyInUseException } from 'src/contexts/Lifetails/Authentication/domain/exceptions/EmailAlreadyInUseException';
import { Account } from 'src/contexts/Lifetails/Authentication/domain/entities/Account';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { CreateUserCommandHandler } from 'src/contexts/Lifetails/Users/application/createUser/CreateUserCommandHandler';

describe('CreateAccountMutation', () => {
  let mockedId: string;
  let mutation: CreateAccountMutation;
  let commandHandler: CreateAccountCommandHandler;
  let userCommandHandler: CreateUserCommandHandler;

  beforeEach(async () => {
    mockedId = faker.string.uuid();
    const mockAccount = {
      id: mockedId,
    } as unknown as Account;

    // Create mock command handler with Jest
    const mockCommandHandler = {
      execute: jest.fn().mockResolvedValue(mockAccount),
    } as unknown as CreateAccountCommandHandler;

    // Create mock user command handler
    const mockUserCommandHandler = {
      execute: jest.fn().mockResolvedValue({}),
    } as unknown as CreateUserCommandHandler;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateAccountMutation,
        {
          provide: CreateAccountCommandHandler,
          useValue: mockCommandHandler,
        },
        {
          provide: CreateUserCommandHandler,
          useValue: mockUserCommandHandler,
        },
      ],
    }).compile();

    mutation = module.get<CreateAccountMutation>(CreateAccountMutation);
    commandHandler = module.get<CreateAccountCommandHandler>(CreateAccountCommandHandler);
    userCommandHandler = module.get<CreateUserCommandHandler>(CreateUserCommandHandler);
  });

  it('should throw error when email is already in use', async () => {
    // Arrange
    const input: CreateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      nickname: faker.person.firstName(),
    };

    commandHandler.execute = jest.fn().mockRejectedValue(new EmailAlreadyInUseException());

    // Act & Assert
    await expect(mutation.createAccount(input)).rejects.toThrow('Email already in use');
    expect(commandHandler.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        email: input.email,
        password: input.password,
        id: expect.any(String),
      }),
    );
  });

  it('should throw error when an unexpected error occurs', async () => {
    // Arrange
    const input: CreateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      nickname: faker.person.firstName(),
    };
    const errorMessage = 'Unexpected error';

    commandHandler.execute = jest.fn().mockRejectedValue(new Error(errorMessage));

    // Act & Assert
    await expect(mutation.createAccount(input)).rejects.toThrow(errorMessage);
    expect(commandHandler.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        email: input.email,
        password: input.password,
        id: expect.any(String),
      }),
    );
  });

  it('should create an account', async () => {
    // Arrange
    const input: CreateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      nickname: faker.person.firstName(),
    };

    // Act
    await mutation.createAccount(input);

    // Assert
    expect(commandHandler.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        email: input.email,
        password: input.password,
        id: expect.any(String),
      }),
    );
    expect(userCommandHandler.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        accountId: mockedId,
        nickname: input.nickname,
        id: expect.any(String),
      }),
    );
  });
});
