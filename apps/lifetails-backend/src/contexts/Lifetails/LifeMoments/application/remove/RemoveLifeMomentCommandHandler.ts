import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { LifeMomentNotFoundException } from '../../domain/exceptions/LifeMomentNotFoundException';
import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { RemoveLifeMomentCommand } from './RemoveLifeMomentCommand';

export class RemoveLifeMomentCommandHandler {
  constructor(private readonly repository: LifeMomentRepository) {}

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
