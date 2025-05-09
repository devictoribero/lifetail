import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { AuthenticateAccountMutation } from './AuthenticateAccountMutation';
import { AuthenticateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/authenticateAccount/AuthenticateAccountCommandHandler';
import { AuthenticateAccountInput } from './AuthenticateAccountInput';
import { InvalidCredentialsException } from 'src/contexts/Lifetails/Authentication/domain/exceptions/InvalidCredentialsException';

describe('AuthenticateAccountMutation', () => {
  let mutation: AuthenticateAccountMutation;
  let commandHandler: AuthenticateAccountCommandHandler;

  beforeEach(async () => {
    // Create mock use case with Jest
    commandHandler = {
      execute: jest.fn(),
    } as unknown as AuthenticateAccountCommandHandler;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticateAccountMutation,
        {
          provide: AuthenticateAccountCommandHandler,
          useValue: commandHandler,
        },
      ],
    }).compile();

    mutation = module.get<AuthenticateAccountMutation>(AuthenticateAccountMutation);
    commandHandler = module.get<AuthenticateAccountCommandHandler>(
      AuthenticateAccountCommandHandler,
    );
  });

  it('should throw error when account is not found', async () => {
    // Arrange
    const input: AuthenticateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    jest.spyOn(commandHandler, 'execute').mockRejectedValue(new InvalidCredentialsException());

    // Act & Assert
    await expect(mutation.authenticateAccount(input)).rejects.toThrow('Invalid email or password');
    expect(commandHandler.execute).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
    });
  });

  it('should throw error when credentials are invalid', async () => {
    // Arrange
    const input: AuthenticateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    jest.spyOn(commandHandler, 'execute').mockRejectedValue(new InvalidCredentialsException());

    // Act & Assert
    await expect(mutation.authenticateAccount(input)).rejects.toThrow('Invalid email or password');
    expect(commandHandler.execute).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
    });
  });

  it('should return accountId when authentication is successful', async () => {
    // Arrange
    const input: AuthenticateAccountInput = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const accountId = faker.string.uuid();

    jest.spyOn(commandHandler, 'execute').mockResolvedValue(accountId);

    // Act
    const result = await mutation.authenticateAccount(input);

    // Assert
    expect(result).toEqual({ accountId });
    expect(commandHandler.execute).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
    });
  });
});
