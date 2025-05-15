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
  let commandHandler: DeleteAccountCommandHandler;
  let mockRepository: jest.Mocked<AccountRepository>;
  let mockEventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    mockRepository = {
      find: jest.fn(),
      delete: jest.fn(),
      save: jest.fn(),
      findByEmail: jest.fn(),
    } as jest.Mocked<AccountRepository>;

    mockEventBus = {
      publish: jest.fn(),
    } as jest.Mocked<EventBus>;

    // Create commandHandler instance directly
    commandHandler = new DeleteAccountCommandHandler(mockRepository, mockEventBus);
  });

  it('should be defined', () => {
    expect(commandHandler).toBeDefined();
  });

  it('should throw AccountNotFoundException when account does not exist', async () => {
    // Arrange
    const accountId = UUID.create().toString();
    const command = new DeleteAccountCommand(accountId);
    mockRepository.find.mockResolvedValue(null);

    // Act & Assert
    await expect(commandHandler.handle(command)).rejects.toThrow(AccountNotFoundException);
    expect(mockRepository.find).toHaveBeenCalledWith(expect.any(UUID));
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

    mockRepository.find.mockResolvedValue(account);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(mockRepository.find).toHaveBeenCalledWith(accountId);
    expect(account.markAsDeleted).toHaveBeenCalled();
    expect(mockRepository.delete).toHaveBeenCalledWith(account);
    expect(mockEventBus.publish).toHaveBeenCalled();
  });
});
