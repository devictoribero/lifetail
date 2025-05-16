import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { UpdateLifeMomentCommand } from './UpdateLifeMomentCommand';
import { LifeMomentNotFoundException } from '../../domain/exceptions/LifeMomentNotFoundException';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Inject, Injectable } from '@nestjs/common';
import { LIFE_MOMENT_REPOSITORY } from '../../domain/repositories/LifeMomentRepository';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';

@Injectable()
export class UpdateLifeMomentCommandHandler implements CommandHandler<UpdateLifeMomentCommand> {
  constructor(
    @Inject(LIFE_MOMENT_REPOSITORY)
    private readonly repository: LifeMomentRepository,
  ) {}

  async handle(command: UpdateLifeMomentCommand): Promise<void> {
    const lifeMomentId = new UUID(command.id);
    const lifeMoment = await this.getLifeMoment(lifeMomentId);

    if (this.hasField(command.description)) {
      lifeMoment.updateDescription(new StringValueObject(command.description));
    }

    if (this.hasField(command.occurredOn)) {
      lifeMoment.reschedule(new DateValueObject(command.occurredOn));
    }

    await this.repository.save(lifeMoment);
  }

  private async getLifeMoment(id: UUID): Promise<LifeMoment> {
    const lifeMoment = await this.repository.find(id);
    if (!lifeMoment) {
      throw new LifeMomentNotFoundException();
    }
    return lifeMoment;
  }

  private hasField(value: any): boolean {
    return value !== undefined;
  }
}
