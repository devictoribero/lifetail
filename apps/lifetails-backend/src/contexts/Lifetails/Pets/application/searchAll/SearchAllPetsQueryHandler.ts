import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { Pet } from '../../domain/entities/Pet';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { SearchAllPetsQuery } from './SearchAllPetsQuery';
import { Inject, Injectable } from '@nestjs/common';
import { PET_REPOSITORY } from '../../domain/repositories/PetRepository';

@Injectable()
export class SearchAllPetsQueryHandler {
  constructor(
    @Inject(PET_REPOSITORY)
    private readonly repository: PetRepository,
  ) {}

  async execute(query: SearchAllPetsQuery): Promise<Pet[]> {
    return await this.repository.findByOwner(new UUID(query.ownerId));
  }
}
