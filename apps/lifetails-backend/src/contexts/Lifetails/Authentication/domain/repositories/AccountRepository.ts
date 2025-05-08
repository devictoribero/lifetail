import { Account } from '../entities/Account';

export interface AccountRepository {
  save(account: Account): Promise<void>;
  findByEmail(email: string): Promise<Account | null>;
}
