import { GetAccountQueryHandler } from './GetAccountQueryHandler';
import { GetAccountQuery } from './GetAccountQuery';
import { AccountRepository } from '../../domain/repositories/AccountRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Account } from '../../domain/entities/Account';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { PasswordHashValueObject } from 'src/contexts/Shared/domain/PasswordHashValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { AccountNotFoundException } from '../../domain/exceptions/AccountNotFoundException';

describe('GetAccountQueryHandler', () => {
  let repository: AccountRepository;
  let handler: GetAccountQueryHandler;

  const accountId = UUID.generate();
  const email = new EmailValueObject('test@example.com');
  const password = new PasswordHashValueObject('hashedPassword');
  const createdAt = new DateValueObject(new Date());

  const account = new Account({
    id: accountId,
    email,
    password,
    createdAt,
  });

  beforeEach(() => {
    repository = {
      find: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn(),
    };

    handler = new GetAccountQueryHandler(repository);
  });

  it('should get an account when it exists', async () => {
    // Arrange
    const query = new GetAccountQuery(accountId.toString());
    repository.find = jest.fn().mockResolvedValue(account);

    // Act
    const result = await handler.handle(query);

    // Assert
    expect(repository.find).toHaveBeenCalledWith(expect.any(UUID));
    expect(result).toBe(account);
  });

  it('should throw AccountNotFoundException when account does not exist', async () => {
    // Arrange
    const query = new GetAccountQuery(accountId.toString());
    repository.find = jest.fn().mockResolvedValue(null);

    // Act & Assert
    await expect(handler.handle(query)).rejects.toThrow(AccountNotFoundException);
    expect(repository.find).toHaveBeenCalledWith(expect.any(UUID));
  });
});
