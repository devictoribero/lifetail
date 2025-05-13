import { User } from '../entities/User';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  save(user: User): Promise<void>;
  getByAccountId(accountId: UUID): Promise<User | null>;
  getById(id: UUID): Promise<User | null>;
}
