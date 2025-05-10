import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { Pet } from '../../domain/entities/Pet';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { SearchAllPetsQuery } from './SearchAllPetsQuery';

export class SearchAllPetsQueryHandler {
  constructor(private readonly repository: PetRepository) {}

  async execute(query: SearchAllPetsQuery): Promise<Pet[]> {
    return await this.repository.findByOwner(new UUID(query.ownerId));
  }
}
