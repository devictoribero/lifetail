import { faker } from '@faker-js/faker';
import { AuthenticateAccountCommandHandler } from './AuthenticateAccountCommandHandler';
import { AccountRepository } from '../../../Accounts/domain/repositories/AccountRepository';
import { PasswordHasher } from '../../domain/services/PasswordHasher';
import { Account } from '../../../Accounts/domain/entities/Account';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { PasswordHashValueObject } from 'src/contexts/Shared/domain/PasswordHashValueObject';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { InvalidCredentialsException } from '../../domain/exceptions/InvalidCredentialsException';
import { AuthenticateAccountCommand } from './AuthenticateAccountCommand';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

describe('AuthenticateAccountCommandHandler', () => {
  let commandHandler: AuthenticateAccountCommandHandler;
  let repository: jest.Mocked<AccountRepository>;
  let hasher: jest.Mocked<PasswordHasher>;
  let account: Account;
  let accountId: string;

  beforeEach(() => {
    repository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<AccountRepository>;

    hasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as jest.Mocked<PasswordHasher>;
    commandHandler = new AuthenticateAccountCommandHandler(repository, hasher);

    // Create a mock account
    accountId = faker.string.uuid();
    jest.spyOn(UUID, 'generate').mockReturnValue(new UUID(accountId));

    const email = new EmailValueObject(faker.internet.email());
    const password = new PasswordHashValueObject('hashed_password');
    const createdAt = new Date();
    account = new Account({
      id: new UUID(accountId),
      email,
      password,
      createdAt: new DateValueObject(createdAt),
    });
  });

  it('should throw InvalidCredentialsException when account with email is not found', async () => {
    // Arrange
    const email = faker.internet.email();
    const password = faker.internet.password();
    const command = new AuthenticateAccountCommand(email, password);

    repository.findByEmail.mockResolvedValue(null);

    // Act & Assert
    await expect(commandHandler.handle(command)).rejects.toThrow(InvalidCredentialsException);
    expect(repository.findByEmail).toHaveBeenCalledWith(new EmailValueObject(command.email));
  });

  it('should throw InvalidCredentialsException when password is incorrect', async () => {
    // Arrange
    const email = faker.internet.email();
    const password = faker.internet.password();
    const command = new AuthenticateAccountCommand(email, password);

    repository.findByEmail.mockResolvedValue(account);
    hasher.compare.mockResolvedValue(false);

    // Act & Assert
    await expect(commandHandler.handle(command)).rejects.toThrow(InvalidCredentialsException);
    expect(repository.findByEmail).toHaveBeenCalledWith(new EmailValueObject(command.email));
    expect(hasher.compare).toHaveBeenCalledWith(
      new StringValueObject(command.password),
      account.getPassword(),
    );
  });

  it('should return account id when credentials are valid', async () => {
    // Arrange
    const email = faker.internet.email();
    const password = faker.internet.password();
    const command = new AuthenticateAccountCommand(email, password);

    repository.findByEmail.mockResolvedValue(account);
    hasher.compare.mockResolvedValue(true);

    // Act
    const result = await commandHandler.handle(command);

    // Assert
    expect(result).toBe(accountId);
    expect(repository.findByEmail).toHaveBeenCalledWith(new EmailValueObject(command.email));
    expect(hasher.compare).toHaveBeenCalledWith(
      new StringValueObject(command.password),
      account.getPassword(),
    );
  });
});
