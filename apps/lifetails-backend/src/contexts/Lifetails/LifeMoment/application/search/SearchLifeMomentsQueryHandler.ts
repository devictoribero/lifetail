import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { SearchLifeMomentsQuery } from './SearchLifeMomentsQuery';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { Injectable, Inject } from '@nestjs/common';
import { LIFE_MOMENT_REPOSITORY } from '../../domain/repositories/LifeMomentRepository';
import { QueryHandler } from 'src/contexts/Shared/domain/QueryHandler';

@Injectable()
export class SearchLifeMomentsQueryHandler
  implements QueryHandler<SearchLifeMomentsQuery, LifeMoment[]>
{
  constructor(
    @Inject(LIFE_MOMENT_REPOSITORY)
    private readonly repository: LifeMomentRepository,
  ) {}

  async handle(query: SearchLifeMomentsQuery): Promise<LifeMoment[]> {
    const petId = new UUID(query.petId);
    const lifeMoments = await this.repository.search(petId);

    return lifeMoments;
  }
}
