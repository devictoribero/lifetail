import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import {
  AccountRepository,
  ACCOUNT_REPOSITORY,
} from '../../../Authentication/domain/repositories/AccountRepository';
import { AccountNotFoundException } from '../../../Authentication/domain/exceptions/AccountNotFoundException';
import { DeleteAccountCommand } from './DeleteAccountCommand';
import { EventBus, EVENT_BUS } from 'src/contexts/Shared/domain/EventBus';
import { Account } from '../../../Authentication/domain/entities/Account';

@Injectable()
export class DeleteAccountCommandHandler {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly repository: AccountRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteAccountCommand): Promise<void> {
    const accountId = new UUID(command.accountId);

    const account = await this.getAccount(accountId);
    account.markAsDeleted();

    await this.repository.delete(account);
    await this.eventBus.publish(account.pullDomainEvents());
  }

  private async getAccount(accountId: UUID): Promise<Account> {
    const account = await this.repository.get(accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }

    return account;
  }
}
