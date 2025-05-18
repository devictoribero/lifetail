import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Account } from '../entities/Account';

export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY';

export interface AccountRepository {
  save(account: Account): Promise<void>;
  findByEmail(email: EmailValueObject): Promise<Account | null>;
  find(id: UUID): Promise<Account | null>;
}
