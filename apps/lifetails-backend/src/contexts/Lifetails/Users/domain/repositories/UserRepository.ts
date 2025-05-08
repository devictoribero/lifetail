import { User } from '../entities/User';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';

export const UserRepositorySymbol = Symbol('UserRepository');

export interface UserRepository {
  save(user: User): Promise<void>;
  getByAccountId(accountId: UUID): Promise<User | null>;
}
