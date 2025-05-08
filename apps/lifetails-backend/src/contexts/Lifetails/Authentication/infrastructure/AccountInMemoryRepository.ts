import { Account } from '../domain/entities/Account';
import { AccountRepository } from '../domain/repositories/AccountRepository';
import { EmailValueObject } from '../../Shared/domain/EmailValueObject';

export class AccountInMemoryRepository implements AccountRepository {
  private accounts: Account[] = [];

  async save(account: Account): Promise<void> {
    const existingAccountIndex = this.accounts.findIndex(
      (acc) => acc.getEmail().toString() === account.getEmail().toString(),
    );

    if (existingAccountIndex >= 0) {
      this.accounts[existingAccountIndex] = account;
    } else {
      this.accounts.push(account);
    }
  }

  async findByEmail(email: string): Promise<Account | null> {
    const emailVO = new EmailValueObject(email);
    const account = this.accounts.find((acc) => acc.getEmail().toString() === emailVO.toString());

    return account || null;
  }
}
