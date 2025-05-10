import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { LifeMomentType } from '../../domain/entities/LifeMomentType';
import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { AddLifeMomentCommand } from './AddLifeMomentCommand';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';

export class AddLifeMomentCommandHandler {
  constructor(private readonly repository: LifeMomentRepository) {}

  async execute(command: AddLifeMomentCommand): Promise<void> {
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
