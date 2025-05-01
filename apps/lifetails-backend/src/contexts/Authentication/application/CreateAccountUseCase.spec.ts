import { Account } from '../domain/entities/Account';
import { AccountRepository } from '../domain/repositories/AccountRepository';
import { PasswordHasher } from '../domain/services/PasswordHasher';
import { EmailAlreadyInUseException } from '../domain/exceptions/EmailAlreadyInUseException';
import { CreateAccountCommand, CreateAccountUseCase } from './CreateAccountUseCase';
import { PasswordHashValueObject } from 'src/contexts/Shared/domain/PasswordHashValueObject';
import { faker } from '@faker-js/faker';

describe('CreateAccountUseCase', () => {
  let useCase: CreateAccountUseCase;
  let repository: jest.Mocked<AccountRepository>;
  let hasher: jest.Mocked<PasswordHasher>;

  beforeEach(() => {
    repository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as jest.Mocked<AccountRepository>;

    hasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    } as jest.Mocked<PasswordHasher>;

    useCase = new CreateAccountUseCase(repository, hasher);
  });

  it('should throw EmailAlreadyInUseException when email is already in use', async () => {
    const email = faker.internet.email();
    const password = faker.internet.password();
    // Arrange
    const command = new CreateAccountCommand(email, password);
    const existingAccount = {} as Account; // mock existing account

    repository.findByEmail.mockResolvedValue(existingAccount);

    // Act & Assert

    await expect(useCase.execute(command)).rejects.toThrow(EmailAlreadyInUseException);
    expect(repository.findByEmail).toHaveBeenCalledWith(command.email);
  });

  it('should create a new account when email is not in use', async () => {
    // Arrange
    const email = faker.internet.email();
    const password = faker.internet.password();
    const command = new CreateAccountCommand(email, password);
    const hashedPassword = new PasswordHashValueObject('hashed_password');

    repository.findByEmail.mockResolvedValue(null);
    hasher.hash.mockResolvedValue(hashedPassword);

    // Act
    await useCase.execute(command);

    // Assert
    expect(repository.findByEmail).toHaveBeenCalledWith(command.email);
    expect(hasher.hash).toHaveBeenCalledWith(command.password);
    expect(repository.save).toHaveBeenCalledWith(expect.any(Account));

    // Verify the correct account was created
    const savedAccount = repository.save.mock.calls[0][0];
    expect(savedAccount.getEmail().toString()).toBe(command.email);
    expect(savedAccount.getPassword().toString()).toBe(hashedPassword.toString());
  });
});
