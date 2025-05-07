import { UUID } from 'src/Lifetails/contexts/Shared/domain/UUID';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';

export class GetUserService {
  constructor(private readonly repository: UserRepository) {}

  async execute(accountId: UUID): Promise<User | null> {
    return this.repository.getByAccountId(accountId);
  }
}
