import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { AccountRepository, ACCOUNT_REPOSITORY } from '../../domain/repositories/AccountRepository';
import { AccountNotFoundException } from '../../domain/exceptions/AccountNotFoundException';
import { GetAccountQuery } from './GetAccountQuery';
import { Account } from '../../domain/entities/Account';
import { QueryHandler } from 'src/contexts/Shared/domain/QueryHandler';

@Injectable()
export class GetAccountQueryHandler implements QueryHandler<GetAccountQuery, Account> {
  constructor(
    @Inject(ACCOUNT_REPOSITORY)
    private readonly repository: AccountRepository,
  ) {}

  async handle(query: GetAccountQuery): Promise<Account> {
    const accountId = new UUID(query.accountId);
    const account = await this.repository.find(accountId);

    if (!account) {
      throw new AccountNotFoundException();
    }

    return account;
  }
}
