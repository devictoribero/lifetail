import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentRepository } from '../../domain/repositories/PetLifeMomentRepository';
import { FindPetLifeMomentQuery } from './FindPetLifeMomentQuery';
import { PetLifeMomentNotFoundException } from '../../domain/exceptions/PetLifeMomentNotFoundException';

export class FindPetLifeMomentUseCase {
  constructor(private readonly repository: PetLifeMomentRepository) {}

  async execute(query: FindPetLifeMomentQuery): Promise<PetLifeMoment> {
    const petLifeMoment = await this.repository.find(query.id);
    if (!petLifeMoment) {
      throw new PetLifeMomentNotFoundException(query.id);
    }

    return petLifeMoment;
  }
}
