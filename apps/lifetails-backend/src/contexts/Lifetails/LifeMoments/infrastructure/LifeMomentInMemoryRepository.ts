import { Injectable } from '@nestjs/common';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMoment } from '../domain/entities/LifeMoment';
import { LifeMomentRepository } from '../domain/repositories/LifeMomentRepository';

interface InMemoryLifeMoment {
  isDeleted: boolean;
  id: string;
  type: string;
  theme: string;
  petId: string;
  createdBy: string;
  occurredOn: Date;
  description: string;
}

@Injectable()
export class LifeMomentInMemoryRepository implements LifeMomentRepository {
  private moments: Map<string, InMemoryLifeMoment> = new Map();

  async save(lifeMoment: LifeMoment): Promise<void> {
    this.moments.set(lifeMoment.getId().toString(), {
      ...lifeMoment.toPrimitives(),
      isDeleted: false,
    } as InMemoryLifeMoment);
  }

  async remove(id: UUID): Promise<void> {
    const lifeMoment = this.moments.get(id.toString());
    if (lifeMoment) {
      lifeMoment.isDeleted = true;
    }
  }

  async find(id: UUID): Promise<LifeMoment | null> {
    const lifeMoment = this.moments.get(id.toString());

    if (!lifeMoment || lifeMoment.isDeleted) {
      return null;
    }

    return LifeMoment.fromPrimitives({
      id: lifeMoment.id,
      type: lifeMoment.type,
      theme: lifeMoment.theme,
      petId: lifeMoment.petId,
      createdBy: lifeMoment.createdBy,
      occurredOn: lifeMoment.occurredOn,
      description: lifeMoment.description,
    });
  }

  async search(petId: UUID): Promise<LifeMoment[]> {
    const result: LifeMoment[] = [];

    for (const lifeMoment of this.moments.values()) {
      if (lifeMoment.petId === petId.toString() && !lifeMoment.isDeleted) {
        result.push(
          LifeMoment.fromPrimitives({
            id: lifeMoment.id,
            type: lifeMoment.type,
            theme: lifeMoment.theme,
            petId: lifeMoment.petId,
            createdBy: lifeMoment.createdBy,
            occurredOn: lifeMoment.occurredOn,
            description: lifeMoment.description,
          }),
        );
      }
    }

    return result;
  }
}
