import { faker } from '@faker-js/faker';
import { AuthenticateAccountCommandHandler } from './AuthenticateAccountCommandHandler';
import { AccountRepository } from '../../domain/repositories/AccountRepository';
import { PasswordHasher } from '../../domain/services/PasswordHasher';
import { Account } from '../../domain/entities/Account';
import { EmailValueObject } from '../../../Shared/domain/EmailValueObject';
import { PasswordHashValueObject } from '../../../Shared/domain/PasswordHashValueObject';
import { UUID } from '../../../Shared/domain/UUID';
import { InvalidCredentialsException } from '../../domain/exceptions/InvalidCredentialsException';
import { AuthenticateAccountCommand } from './AuthenticateAccountCommand';

describe('AuthenticateAccountUseCase', () => {
  let commandHandler: AuthenticateAccountCommandHandler;
  let repository: jest.Mocked<AccountRepository>;
  let hasher: jest.Mocked<PasswordHasher>;
  let account: Account;
  let accountId: string;

  beforeEach(() => {
    repository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as jest.Mocked<AccountRepository>;

    hasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as jest.Mocked<PasswordHasher>;
    commandHandler = new AuthenticateAccountCommandHandler(repository, hasher);

    // Create a mock account
    accountId = faker.string.uuid();
    jest.spyOn(UUID, 'create').mockReturnValue(new UUID(accountId));

    const email = new EmailValueObject(faker.internet.email());
    const password = new PasswordHashValueObject('hashed_password');
    const createdAt = new Date();

    // @ts-ignore - Accessing private constructor for testing
    account = new Account(new UUID(accountId), email, password, createdAt);
  });

  it('should throw InvalidCredentialsException when account with email is not found', async () => {
    // Arrange
    const email = faker.internet.email();
    const password = faker.internet.password();
    const command = new AuthenticateAccountCommand(email, password);

    repository.findByEmail.mockResolvedValue(null);

    // Act & Assert
    await expect(commandHandler.execute(command)).rejects.toThrow(InvalidCredentialsException);
    expect(repository.findByEmail).toHaveBeenCalledWith(command.email);
  });

  it('should throw InvalidCredentialsException when password is incorrect', async () => {
    // Arrange
    const email = faker.internet.email();
    const password = faker.internet.password();
    const command = new AuthenticateAccountCommand(email, password);

    repository.findByEmail.mockResolvedValue(account);
    hasher.compare.mockResolvedValue(false);

    // Act & Assert
    await expect(commandHandler.execute(command)).rejects.toThrow(InvalidCredentialsException);
    expect(repository.findByEmail).toHaveBeenCalledWith(command.email);
    expect(hasher.compare).toHaveBeenCalledWith(command.password, account.getPassword());
  });

  it('should return account id when credentials are valid', async () => {
    // Arrange
    const email = faker.internet.email();
    const password = faker.internet.password();
    const command = new AuthenticateAccountCommand(email, password);

    repository.findByEmail.mockResolvedValue(account);
    hasher.compare.mockResolvedValue(true);

    // Act
    const result = await commandHandler.execute(command);

    // Assert
    expect(result).toBe(accountId);
    expect(repository.findByEmail).toHaveBeenCalledWith(command.email);
    expect(hasher.compare).toHaveBeenCalledWith(command.password, account.getPassword());
  });
});
