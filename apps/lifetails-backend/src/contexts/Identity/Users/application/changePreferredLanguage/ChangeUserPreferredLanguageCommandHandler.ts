import { ChangeUserPreferredLanguageCommand } from './ChangeUserPreferredLanguageCommand';
import { UserRepository, USER_REPOSITORY } from '../../domain/repositories/UserRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { UserNotFoundException } from '../../domain/exceptions/UserNotFoundException';
import { LanguageCode } from 'src/contexts/Shared/domain/LanguageCode';
import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/User';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';

@Injectable()
export class ChangeUserPreferredLanguageCommandHandler
  implements CommandHandler<ChangeUserPreferredLanguageCommand>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async handle(command: ChangeUserPreferredLanguageCommand): Promise<void> {
    const userId = new UUID(command.userId);
    const user = await this.getUser(userId);

    const preferredLanguage = LanguageCode.fromPrimitives(command.languageCode);
    user.changePreferredLanguageTo(preferredLanguage);

    await this.userRepository.save(user);
  }

  private async getUser(userId: UUID): Promise<User> {
    const user = await this.userRepository.getById(userId);

    if (!user) {
      throw new UserNotFoundException(userId.toString());
    }

    return user;
  }
}
