import { Pet } from '../../domain/entities/Pet';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { FindPetQuery } from './FindPetQuery';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';

export class FindPetQueryHandler {
  constructor(private readonly repository: PetRepository) {}

  async execute(query: FindPetQuery): Promise<Pet> {
    const pet = await this.repository.find(query.id);
    console.log(pet);
    if (!pet) {
      throw new PetNotFoundException(query.id);
    }

    return pet;
  }
}
