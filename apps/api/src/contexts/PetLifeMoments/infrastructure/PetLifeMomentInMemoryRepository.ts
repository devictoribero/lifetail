import { PetLifeMoment } from '../domain/entities/PetLifeMoment';
import { PetLifeMomentRepository } from '../domain/repositories/PetLifeMomentRepository';

export class PetLifeMomentInMemoryRepository implements PetLifeMomentRepository {
  private moments: Map<string, PetLifeMoment> = new Map();

  async save(moment: PetLifeMoment): Promise<void> {
    this.moments.set(moment.getId(), moment);
  }
}
