import { Account } from '../domain/entities/Account';
import { AccountRepository } from '../domain/repositories/AccountRepository';
import { EmailValueObject } from '../../Shared/domain/EmailValueObject';
import { Injectable } from '@nestjs/common';
import { UUID } from '../../Shared/domain/UUID';

type InMemoryAccount = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
};

@Injectable()
export class AccountInMemoryRepository implements AccountRepository {
  private accounts: Map<string, InMemoryAccount> = new Map();

  async save(account: Account): Promise<void> {
    this.accounts.set(account.getId().toString(), {
      ...account.toPrimitives(),
      isDeleted: false,
    } as InMemoryAccount);
  }

  async findByEmail(email: EmailValueObject): Promise<Account | null> {
    const account = Array.from(this.accounts.values()).find(
      (acc) => acc.email === email.toString(),
    );

    if (!account) {
      return null;
    }

    return Account.fromPrimitives(
      account.id,
      account.email,
      account.password,
      new Date(account.createdAt),
    );
  }

  async get(id: UUID): Promise<Account | null> {
    const account = this.accounts.get(id.toString());
    if (!account) {
      return null;
    }

    return Account.fromPrimitives(
      account.id,
      account.email,
      account.password,
      new Date(account.createdAt),
    );
  }

  async delete(account: Account): Promise<void> {
    this.accounts.delete(account.getId().toString());
  }
}
