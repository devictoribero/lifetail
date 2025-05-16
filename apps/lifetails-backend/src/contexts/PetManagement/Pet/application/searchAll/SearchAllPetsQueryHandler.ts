import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Pet } from '../../domain/entities/Pet';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { SearchAllPetsQuery } from './SearchAllPetsQuery';
import { Inject, Injectable } from '@nestjs/common';
import { PET_REPOSITORY } from '../../domain/repositories/PetRepository';
import { QueryHandler } from 'src/contexts/Shared/domain/QueryHandler';

@Injectable()
export class SearchAllPetsQueryHandler implements QueryHandler<SearchAllPetsQuery, Pet[]> {
  constructor(
    @Inject(PET_REPOSITORY)
    private readonly repository: PetRepository,
  ) {}

  async handle(query: SearchAllPetsQuery): Promise<Pet[]> {
    return await this.repository.findByOwner(new UUID(query.ownerId));
  }
}
