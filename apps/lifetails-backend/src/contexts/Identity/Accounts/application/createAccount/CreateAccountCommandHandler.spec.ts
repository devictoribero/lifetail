import { PasswordHashValueObject } from 'src/contexts/Shared/domain/PasswordHashValueObject';
import { faker } from '@faker-js/faker';
import { CreateAccountCommandHandler } from './CreateAccountCommandHandler';
import { CreateAccountCommand } from './CreateAccountCommand';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { EventBus } from 'src/contexts/Shared/domain/EventBus';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { AccountRepository } from 'src/contexts/Identity/Authentication/domain/repositories/AccountRepository';
import { PasswordHasher } from 'src/contexts/Identity/Authentication/domain/services/PasswordHasher';
import { Account } from 'src/contexts/Identity/Authentication/domain/entities/Account';
import { EmailAlreadyInUseException } from 'src/contexts/Identity/Authentication/domain/exceptions/EmailAlreadyInUseException';

describe('CreateAccountCommandHandler', () => {
  let commandHandler: CreateAccountCommandHandler;
  let repository: jest.Mocked<AccountRepository>;
  let hasher: jest.Mocked<PasswordHasher>;
  let eventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    repository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<AccountRepository>;

    hasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as jest.Mocked<PasswordHasher>;

    eventBus = {
      publish: jest.fn(),
    } as jest.Mocked<EventBus>;

    commandHandler = new CreateAccountCommandHandler(repository, hasher, eventBus);
  });

  it('should throw EmailAlreadyInUseException when email is already in use', async () => {
    // Arrange
    const email = faker.internet.email();
    const password = faker.internet.password();
    const command = new CreateAccountCommand(UUID.create().toString(), email, password);
    const existingAccount = new Account(
      new UUID(faker.string.uuid()),
      new EmailValueObject(email),
      new PasswordHashValueObject(password),
      new DateValueObject(new Date()),
    );
    repository.findByEmail.mockResolvedValue(existingAccount);

    // Act
    await expect(commandHandler.execute(command)).rejects.toThrow(EmailAlreadyInUseException);

    // Assert
    expect(repository.findByEmail).toHaveBeenCalledWith(new EmailValueObject(command.email));
  });

  it.only('should create a new account', async () => {
    // Arrange
    const email = faker.internet.email();
    const password = faker.internet.password();
    const command = new CreateAccountCommand(UUID.create().toString(), email, password);
    const hashedPassword = new PasswordHashValueObject('hashed_password');
    repository.findByEmail.mockResolvedValue(null);
    hasher.hash.mockResolvedValue(hashedPassword);

    // Act
    await commandHandler.execute(command);

    // Assert
    expect(repository.findByEmail).toHaveBeenCalledWith(new EmailValueObject(command.email));
    expect(hasher.hash).toHaveBeenCalledWith(new StringValueObject(command.password));
    expect(repository.save).toHaveBeenCalledWith(expect.any(Account));
    const savedAccount = repository.save.mock.calls[0][0];
    expect(savedAccount.getEmail().toString()).toBe(command.email);
    expect(savedAccount.getPassword().toString()).toBe(hashedPassword.toString());
  });
});
