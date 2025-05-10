import { Pet } from '../../domain/entities/Pet';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { FindPetQuery } from './FindPetQuery';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindPetQueryHandler {
  constructor(private readonly repository: PetRepository) {}

  async execute(query: FindPetQuery): Promise<Pet> {
    const pet = await this.repository.find(new UUID(query.id));
    if (!pet) {
      throw new PetNotFoundException(query.id);
    }

    return pet;
  }
}
