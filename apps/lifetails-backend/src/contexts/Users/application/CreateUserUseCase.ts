import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { CreateUserCommand } from './CreateUserCommand';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

export class CreateUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  async run(command: CreateUserCommand): Promise<void> {
    const user = User.create(
      new UUID(command.id),
      new UUID(command.accountId),
      new StringValueObject(command.name),
      new StringValueObject(command.nickname),
      Gender.fromPrimitives(command.gender),
      new DateValueObject(command.birthDate),
    );

    await this.repository.save(user);
  }
}
