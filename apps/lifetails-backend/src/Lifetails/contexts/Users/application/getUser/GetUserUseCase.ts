import { UUID } from 'src/Lifetails/contexts/Shared/domain/UUID';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { GetUserQuery } from './GetUserQuery';
import { UserNotFoundException } from '../../domain/exceptions/UserNotFoundException';

export class GetUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<User> {
    const accountId = new UUID(query.accountId);
    const user = await this.repository.getByAccountId(accountId);

    if (!user) {
      throw new UserNotFoundException(accountId.toString());
    }

    return user;
  }
}
