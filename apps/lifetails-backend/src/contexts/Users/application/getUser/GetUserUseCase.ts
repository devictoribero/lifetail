import { UUID } from 'src/contexts/Shared/domain/UUID';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { GetUserCommand } from './GetUserCommand';
import { UserNotFoundException } from '../../domain/exceptions/UserNotFoundException';

export class GetUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: GetUserCommand): Promise<User> {
    const accountId = new UUID(command.accountId);
    const user = await this.repository.getByAccountId(accountId);

    if (!user) {
      throw new UserNotFoundException(accountId.toString());
    }

    return user;
  }
}
