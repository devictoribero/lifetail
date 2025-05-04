import { User } from './User';
import { UUID } from 'src/contexts/Shared/domain/UUID';

export interface UserRepository {
  save(user: User): Promise<void>;
  getByAccountId(accountId: UUID): Promise<User | null>;
}
