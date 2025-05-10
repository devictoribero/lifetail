import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { FindLifeMomentQuery } from './FindLifeMomentQuery';
import { LifeMomentNotFoundException } from '../../domain/exceptions/LifeMomentNotFoundException';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindLifeMomentQueryHandler {
  constructor(private readonly repository: LifeMomentRepository) {}

  async execute(query: FindLifeMomentQuery): Promise<LifeMoment> {
    const lifeMomentId = new UUID(query.id);
    const lifeMoment = await this.getLifeMoment(lifeMomentId);

    return lifeMoment;
  }

  private async getLifeMoment(id: UUID): Promise<LifeMoment> {
    const lifeMoment = await this.repository.find(id);

    if (!lifeMoment) {
      throw new LifeMomentNotFoundException(id.toString());
    }

    return lifeMoment;
  }
}
