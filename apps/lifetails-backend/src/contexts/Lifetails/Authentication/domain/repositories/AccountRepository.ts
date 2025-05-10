import { EmailValueObject } from 'src/contexts/Lifetails/Shared/domain/EmailValueObject';
import { Account } from '../entities/Account';

export interface AccountRepository {
  save(account: Account): Promise<void>;
  findByEmail(email: EmailValueObject): Promise<Account | null>;
}
