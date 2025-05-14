import { DeleteAccountCommandHandler } from './DeleteAccountCommandHandler';
import { DeleteAccountCommand } from './DeleteAccountCommand';
import { EventBus } from 'src/contexts/Shared/domain/EventBus';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { PasswordHashValueObject } from 'src/contexts/Shared/domain/PasswordHashValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { AccountRepository } from 'src/contexts/Identity/Accounts/domain/repositories/AccountRepository';
import { AccountNotFoundException } from 'src/contexts/Identity/Accounts/domain/exceptions/AccountNotFoundException';
import { Account } from '../../domain/entities/Account';

describe('DeleteAccountCommandHandler', () => {
  let handler: DeleteAccountCommandHandler;
  let mockRepository: jest.Mocked<AccountRepository>;
  let mockEventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    mockRepository = {
      get: jest.fn(),
      delete: jest.fn(),
      save: jest.fn(),
      findByEmail: jest.fn(),
    } as jest.Mocked<AccountRepository>;

    mockEventBus = {
      publish: jest.fn(),
    } as jest.Mocked<EventBus>;

    // Create handler instance directly
    handler = new DeleteAccountCommandHandler(mockRepository, mockEventBus);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should throw AccountNotFoundException when account does not exist', async () => {
    // Arrange
    const accountId = UUID.create().toString();
    const command = new DeleteAccountCommand(accountId);
    mockRepository.get.mockResolvedValue(null);

    // Act & Assert
    await expect(handler.execute(command)).rejects.toThrow(AccountNotFoundException);
    expect(mockRepository.get).toHaveBeenCalledWith(expect.any(UUID));
    expect(mockRepository.delete).not.toHaveBeenCalled();
    expect(mockEventBus.publish).not.toHaveBeenCalled();
  });

  it('should delete the account and publish events when account exists', async () => {
    // Arrange
    const accountId = UUID.create();
    const command = new DeleteAccountCommand(accountId.toString());

    const account = new Account(
      accountId,
      new EmailValueObject('test@example.com'),
      new PasswordHashValueObject('hashed_password'),
      new DateValueObject(new Date()),
    );

    jest.spyOn(account, 'markAsDeleted');
    jest.spyOn(account, 'pullDomainEvents').mockReturnValue([]);

    mockRepository.get.mockResolvedValue(account);

    // Act
    await handler.execute(command);

    // Assert
    expect(mockRepository.get).toHaveBeenCalledWith(accountId);
    expect(account.markAsDeleted).toHaveBeenCalled();
    expect(mockRepository.delete).toHaveBeenCalledWith(account);
    expect(mockEventBus.publish).toHaveBeenCalled();
  });
});
