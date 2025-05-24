import { GetAccountQueryHandler } from './GetAccountQueryHandler';
import { GetAccountQuery } from './GetAccountQuery';
import { AccountRepository } from '../../domain/repositories/AccountRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { PasswordHashValueObject } from 'src/contexts/Shared/domain/PasswordHashValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { AccountNotFoundException } from '../../domain/exceptions/AccountNotFoundException';
import { AccountObjectMother } from '../../domain/entities/AccountObjectMother.spec';

describe('GetAccountQueryHandler', () => {
  let repository: jest.Mocked<AccountRepository>;
  let handler: GetAccountQueryHandler;

  const accountId = UUID.generate();
  const email = new EmailValueObject('test@example.com');
  const password = new PasswordHashValueObject('hashedPassword');
  const createdAt = new DateValueObject(new Date());

  const account = AccountObjectMother.createWith({ id: accountId, email, password, createdAt });

  beforeEach(() => {
    repository = {
      find: jest.fn(),
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as jest.Mocked<AccountRepository>;

    handler = new GetAccountQueryHandler(repository);
  });

  it('should throw AccountNotFoundException when account does not exist', async () => {
    // Arrange
    const query = new GetAccountQuery(accountId.toString());
    repository.find = jest.fn().mockResolvedValue(null);

    // Act & Assert
    await expect(handler.handle(query)).rejects.toThrow(AccountNotFoundException);
    expect(repository.find).toHaveBeenCalledWith(expect.any(UUID));
  });

  it('should get an account when it exists', async () => {
    // Arrange
    const query = new GetAccountQuery(accountId.toString());
    repository.find = jest.fn().mockResolvedValue(account);

    // Act
    const accountFound = await handler.handle(query);

    // Assert
    expect(repository.find).toHaveBeenCalledWith(expect.any(UUID));
    expect(accountFound).toBe(account);
  });
});
