import { UUID } from 'src/Lifetails/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/Lifetails/contexts/Shared/domain/StringValueObject';
import { Gender } from 'src/Lifetails/contexts/Shared/domain/Gender';
import { User } from '../../domain/entities/User';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { CreateUserCommand } from './CreateUserCommand';
import { DateValueObject } from 'src/Lifetails/contexts/Shared/domain/DateValueObject';
import { UserAlreadyExistsException } from '../../domain/exceptions/UserAlreadyExistsException';
import { GetUserService } from '../../domain/services/GetUserService';

export class CreateUserUseCase {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly repository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const accountId = new UUID(command.accountId);
    await this.ensureUserDoesNotExist(accountId);

    const user = User.create(
      new UUID(command.id),
      accountId,
      new StringValueObject(command.name),
      new StringValueObject(command.nickname),
      Gender.fromPrimitives(command.gender),
      new DateValueObject(command.birthDate),
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
