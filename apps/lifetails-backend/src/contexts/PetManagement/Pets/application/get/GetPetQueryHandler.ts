import { Pet } from '../../domain/entities/Pet';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { GetPetQuery } from './GetPetQuery';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Inject, Injectable } from '@nestjs/common';
import { PET_REPOSITORY } from '../../domain/repositories/PetRepository';

@Injectable()
export class GetPetQueryHandler {
  constructor(
    @Inject(PET_REPOSITORY)
    private readonly repository: PetRepository,
  ) {}

  async execute(query: GetPetQuery): Promise<Pet> {
    const pet = await this.repository.find(new UUID(query.id));
    if (!pet) {
      throw new PetNotFoundException(query.id);
    }

    return pet;
  }
}
