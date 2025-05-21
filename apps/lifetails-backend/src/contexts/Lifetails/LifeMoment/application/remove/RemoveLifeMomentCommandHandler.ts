import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMomentNotFoundException } from '../../domain/exceptions/LifeMomentNotFoundException';
import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { RemoveLifeMomentCommand } from './RemoveLifeMomentCommand';
import { Injectable, Inject } from '@nestjs/common';
import { LIFE_MOMENT_REPOSITORY } from '../../domain/repositories/LifeMomentRepository';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';

@Injectable()
export class RemoveLifeMomentCommandHandler implements CommandHandler<RemoveLifeMomentCommand> {
  constructor(
    @Inject(LIFE_MOMENT_REPOSITORY)
    private readonly repository: LifeMomentRepository,
  ) {}

  async handle(command: RemoveLifeMomentCommand): Promise<void> {
    const lifeMomentId = new UUID(command.id);
    const lifeMoment = await this.repository.find(lifeMomentId);

    if (!lifeMoment) {
      throw new LifeMomentNotFoundException();
    }

    lifeMoment.markAsDeleted();
    await this.repository.save(lifeMoment);
  }
}
