import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { LifeMomentNotFoundException } from '../../domain/exceptions/LifeMomentNotFoundException';
import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { RemoveLifeMomentCommand } from './RemoveLifeMomentCommand';
import { Injectable, Inject } from '@nestjs/common';
import { LIFE_MOMENT_REPOSITORY } from '../../domain/repositories/LifeMomentRepository';

@Injectable()
export class RemoveLifeMomentCommandHandler {
  constructor(
    @Inject(LIFE_MOMENT_REPOSITORY)
    private readonly repository: LifeMomentRepository,
  ) {}

  async execute(command: RemoveLifeMomentCommand): Promise<void> {
    const lifeMomentId = new UUID(command.id);
    await this.ensureLifeMomentExists(lifeMomentId);

    await this.repository.remove(lifeMomentId);
  }

  private async ensureLifeMomentExists(id: UUID): Promise<void> {
    const lifeMoment = await this.repository.find(id);
    if (!lifeMoment) {
      throw new LifeMomentNotFoundException(id.toString());
    }
  }
}
