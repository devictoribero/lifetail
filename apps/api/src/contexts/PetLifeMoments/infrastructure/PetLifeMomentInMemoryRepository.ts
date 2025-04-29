import { PetLifeMoment } from '../domain/entities/PetLifeMoment';
import { PetLifeMomentRepository } from '../domain/repositories/PetLifeMomentRepository';

interface InMemoryPetLifeMoment extends PetLifeMoment {
  isDeleted: boolean;
}

export class PetLifeMomentInMemoryRepository implements PetLifeMomentRepository {
  private moments: Map<string, InMemoryPetLifeMoment> = new Map();

  async save(moment: PetLifeMoment): Promise<void> {
    this.moments.set(moment.getId(), {
      ...moment,
      isDeleted: false,
    } as InMemoryPetLifeMoment);
  }

  async remove(id: string): Promise<void> {
    const moment = this.moments.get(id);
    if (moment) {
      moment.isDeleted = true;
    }
  }
}
