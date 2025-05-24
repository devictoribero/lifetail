import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { AccountRepository, ACCOUNT_REPOSITORY } from '../../domain/repositories/AccountRepository';
import { AccountNotFoundException } from '../../domain/exceptions/AccountNotFoundException';
import { DeleteAccountCommand } from './DeleteAccountCommand';
import { EventBus, EVENT_BUS } from 'src/contexts/Shared/domain/EventBus';
import { Account } from '../../domain/entities/Account';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';

@Injectable()
export class DeleteAccountCommandHandler implements CommandHandler<DeleteAccountCommand> {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly repository: AccountRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {}

  async handle(command: DeleteAccountCommand): Promise<void> {
    const accountId = new UUID(command.accountId);
    const account = await this.getAccount(accountId);

    account.markAsDeleted();

    await this.repository.save(account);
    await this.eventBus.publish(account.pullDomainEvents());
  }

  private async getAccount(accountId: UUID): Promise<Account> {
    const account = await this.repository.find(accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }

    return account;
  }
}
