import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentRepository } from '../../domain/repositories/PetLifeMomentRepository';

export class PetLifeMomentInMemoryRepository implements PetLifeMomentRepository {
  private petLifeMoments: Map<string, PetLifeMoment> = new Map();

  async save(petLifeMoment: PetLifeMoment): Promise<void> {
    this.petLifeMoments.set(petLifeMoment.getId(), petLifeMoment);
  }
}
