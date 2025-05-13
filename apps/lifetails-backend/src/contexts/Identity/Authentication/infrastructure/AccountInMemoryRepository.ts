import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { Account } from '../domain/entities/Account';
import { AccountRepository } from '../domain/repositories/AccountRepository';
import { Injectable } from '@nestjs/common';
import { UUID } from 'src/contexts/Shared/domain/UUID';

type InMemoryAccount = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  deletedAt: string | null;
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
      account.deletedAt ? new Date(account.deletedAt) : null,
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
      account.deletedAt ? new Date(account.deletedAt) : null,
    );
  }

  async delete(account: Account): Promise<void> {
    this.accounts.delete(account.getId().toString());
  }
}
