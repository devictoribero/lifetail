import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { GetLifeMomentQuery } from './GetLifeMomentQuery';
import { LifeMomentNotFoundException } from '../../domain/exceptions/LifeMomentNotFoundException';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { Injectable, Inject } from '@nestjs/common';
import { LIFE_MOMENT_REPOSITORY } from '../../domain/repositories/LifeMomentRepository';
import { QueryHandler } from 'src/contexts/Shared/domain/QueryHandler';

@Injectable()
export class GetLifeMomentQueryHandler implements QueryHandler<GetLifeMomentQuery, LifeMoment> {
  constructor(
    @Inject(LIFE_MOMENT_REPOSITORY)
    private readonly repository: LifeMomentRepository,
  ) {}

  async handle(query: GetLifeMomentQuery): Promise<LifeMoment> {
    const lifeMomentId = new UUID(query.id);
    const lifeMoment = await this.getLifeMoment(lifeMomentId);

    return lifeMoment;
  }

  private async getLifeMoment(id: UUID): Promise<LifeMoment> {
    const lifeMoment = await this.repository.find(id);

    if (!lifeMoment) {
      throw new LifeMomentNotFoundException(id);
    }

    return lifeMoment;
  }
}
