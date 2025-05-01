import { Pet } from '../../domain/entities/Pet';
import { PetRepository } from '../../domain/repositories/PetRepository';

export class SearchAllPetsUseCase {
  constructor(private readonly repository: PetRepository) {}

  async execute(): Promise<Pet[]> {
    return this.repository.findAll();
  }
}
