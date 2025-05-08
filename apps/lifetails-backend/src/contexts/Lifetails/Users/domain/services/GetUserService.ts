import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';

export class GetUserService {
  constructor(private readonly repository: UserRepository) {}

  async execute(accountId: UUID): Promise<User | null> {
    return this.repository.getByAccountId(accountId);
  }
}
