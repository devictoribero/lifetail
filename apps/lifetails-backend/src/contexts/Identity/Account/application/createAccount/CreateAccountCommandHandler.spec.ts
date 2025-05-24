import { PasswordHashValueObject } from 'src/contexts/Shared/domain/PasswordHashValueObject';
import { faker } from '@faker-js/faker';
import { CreateAccountCommandHandler } from './CreateAccountCommandHandler';
import { CreateAccountCommand } from './CreateAccountCommand';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { EventBus } from 'src/contexts/Shared/domain/EventBus';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { AccountRepository } from 'src/contexts/Identity/Account/domain/repositories/AccountRepository';
import { PasswordHasher } from 'src/contexts/Identity/Authentication/domain/services/PasswordHasher';
import { EmailAlreadyInUseException } from 'src/contexts/Identity/Account/domain/exceptions/EmailAlreadyInUseException';
import { Account } from '../../domain/entities/Account';
import { AccountObjectMother } from '../../domain/entities/AccountObjectMother.spec';

describe('CreateAccountCommandHandler', () => {
  let commandHandler: CreateAccountCommandHandler;
  let repository: jest.Mocked<AccountRepository>;
  let hasher: jest.Mocked<PasswordHasher>;
  let eventBus: jest.Mocked<EventBus>;

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

    eventBus = {
      publish: jest.fn(),
    } as jest.Mocked<EventBus>;

    commandHandler = new CreateAccountCommandHandler(repository, hasher, eventBus);
  });

  it('should throw EmailAlreadyInUseException when email is already in use', async () => {
    // Arrange
    const existingAccount = AccountObjectMother.create();
    const command = new CreateAccountCommand(
      UUID.generate().toString(),
      existingAccount.getEmail().toString(),
      existingAccount.getPassword().toString(),
    );
    repository.findByEmail.mockResolvedValue(existingAccount);

    // Act
    await expect(commandHandler.handle(command)).rejects.toThrow(EmailAlreadyInUseException);

    // Assert
    expect(repository.findByEmail).toHaveBeenCalledWith(new EmailValueObject(command.email));
  });

  it('should create a new account', async () => {
    // Arrange
    const account = AccountObjectMother.create();
    const command = new CreateAccountCommand(
      UUID.generate().toString(),
      account.getEmail().toString(),
      account.getPassword().toString(),
    );
    const hashedPassword = new PasswordHashValueObject('hashed_password');
    repository.findByEmail.mockResolvedValue(null);
    hasher.hash.mockResolvedValue(hashedPassword);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(repository.findByEmail).toHaveBeenCalledWith(new EmailValueObject(command.email));
    expect(hasher.hash).toHaveBeenCalledWith(new StringValueObject(command.password));
    expect(repository.save).toHaveBeenCalledWith({
      id: expect.any(UUID),
      email: new EmailValueObject(command.email),
      password: hashedPassword,
      createdAt: expect.any(DateValueObject),
      deletedAt: null,
      domainEvents: [],
    });
  });
});
