import { Injectable } from '@nestjs/common';
import { UUID } from '../../Shared/domain/UUID';
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

  async save(moment: LifeMoment): Promise<void> {
    this.moments.set(moment.getId().toString(), {
      ...moment.toPrimitives(),
      isDeleted: false,
    } as InMemoryLifeMoment);
  }

  async remove(id: UUID): Promise<void> {
    const moment = this.moments.get(id.toString());
    if (moment) {
      moment.isDeleted = true;
    }
  }

  async find(id: UUID): Promise<LifeMoment | null> {
    const moment = this.moments.get(id.toString());

    if (!moment || moment.isDeleted) {
      return null;
    }

    return LifeMoment.fromPrimitives(
      moment.id,
      moment.type,
      moment.theme,
      moment.petId,
      moment.createdBy,
      moment.occurredOn,
      moment.description,
    );
  }

  async search(petId: UUID): Promise<LifeMoment[]> {
    const result: LifeMoment[] = [];

    for (const moment of this.moments.values()) {
      if (moment.petId === petId.toString() && !moment.isDeleted) {
        result.push(
          LifeMoment.fromPrimitives(
            moment.id,
            moment.type,
            moment.theme,
            moment.petId,
            moment.createdBy,
            moment.occurredOn,
            moment.description,
          ),
        );
      }
    }

    return result;
  }
}
