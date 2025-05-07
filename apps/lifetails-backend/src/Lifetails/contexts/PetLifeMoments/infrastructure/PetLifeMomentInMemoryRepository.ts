import { PetLifeMoment } from '../domain/entities/PetLifeMoment';
import { PetLifeMomentRepository } from '../domain/repositories/PetLifeMomentRepository';

interface InMemoryPetLifeMoment {
  isDeleted: boolean;
  id: string;
  type: string;
  theme: string;
  petId: string;
  createdBy: string;
  occurredOn: Date;
  description: string;
}

export class PetLifeMomentInMemoryRepository implements PetLifeMomentRepository {
  private moments: Map<string, InMemoryPetLifeMoment> = new Map();

  async save(moment: PetLifeMoment): Promise<void> {
    this.moments.set(moment.getId(), {
      ...moment.toPrimitives(),
      isDeleted: false,
    } as InMemoryPetLifeMoment);
  }

  async remove(id: string): Promise<void> {
    const moment = this.moments.get(id);
    if (moment) {
      moment.isDeleted = true;
    }
  }

  async find(id: string): Promise<PetLifeMoment | null> {
    const moment = this.moments.get(id);

    if (!moment || moment.isDeleted) {
      return null;
    }

    return PetLifeMoment.fromPrimitives(
      moment.id,
      moment.type,
      moment.theme,
      moment.petId,
      moment.createdBy,
      moment.occurredOn,
      moment.description,
    );
  }
}
