import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { CreateUserCommand } from './CreateUserCommand';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { UserAlreadyExistsException } from '../../domain/exceptions/UserAlreadyExistsException';
import { GetUserService } from '../../domain/services/GetUserService';
import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../domain/repositories/UserRepository';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';

@Injectable()
export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
  constructor(
    private readonly getUserService: GetUserService,
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepository,
  ) {}

  async handle(command: CreateUserCommand): Promise<void> {
    const accountId = new UUID(command.accountId);
    await this.ensureUserDoesNotExist(accountId);

    const user = User.create(
      new UUID(command.id),
      accountId,
      new StringValueObject(command.nickname),
    );

    await this.repository.save(user);
  }

  private async ensureUserDoesNotExist(accountId: UUID): Promise<void> {
    const existingUser = await this.getUserService.execute(accountId);

    if (existingUser) {
      throw new UserAlreadyExistsException(accountId.toString());
    }
  }
}
