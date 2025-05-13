import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { SearchLifeMomentsQuery } from './SearchLifeMomentsQuery';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { Injectable, Inject } from '@nestjs/common';
import { LIFE_MOMENT_REPOSITORY } from '../../domain/repositories/LifeMomentRepository';

@Injectable()
export class SearchLifeMomentsQueryHandler {
  constructor(
    @Inject(LIFE_MOMENT_REPOSITORY)
    private readonly repository: LifeMomentRepository,
  ) {}

  async execute(query: SearchLifeMomentsQuery): Promise<LifeMoment[]> {
    const petId = new UUID(query.petId);
    const lifeMoments = await this.repository.search(petId);

    return lifeMoments;
  }
}
