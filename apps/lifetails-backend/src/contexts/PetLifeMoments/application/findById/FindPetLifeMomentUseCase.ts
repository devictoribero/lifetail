import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentRepository } from '../../domain/repositories/PetLifeMomentRepository';
import { FindPetLifeMomentQuery } from './FindPetLifeMomentQuery';

export class FindPetLifeMomentUseCase {
  constructor(private readonly repository: PetLifeMomentRepository) {}

  async execute(query: FindPetLifeMomentQuery): Promise<PetLifeMoment | null> {
    return this.repository.find(query.id);
  }
}
