import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { LifeMomentType } from '../../domain/entities/LifeMomentType';
import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { AddLifeMomentCommand } from './AddLifeMomentCommand';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Injectable, Inject } from '@nestjs/common';
import { LIFE_MOMENT_REPOSITORY } from '../../domain/repositories/LifeMomentRepository';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';

@Injectable()
export class AddLifeMomentCommandHandler implements CommandHandler<AddLifeMomentCommand> {
  constructor(
    @Inject(LIFE_MOMENT_REPOSITORY)
    private readonly repository: LifeMomentRepository,
  ) {}

  async handle(command: AddLifeMomentCommand): Promise<void> {
    const lifeMoment = LifeMoment.create(
      new UUID(command.id),
      LifeMomentType.fromPrimitives(command.type),
      new UUID(command.petId),
      new UUID(command.createdBy),
      new DateValueObject(command.occurredOn),
      new StringValueObject(command.description),
    );

    await this.repository.save(lifeMoment);
  }
}
