import { Injectable } from '@nestjs/common';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMoment } from '../domain/entities/LifeMoment';
import { LifeMomentRepository } from '../domain/repositories/LifeMomentRepository';

@Injectable()
export class LifeMomentInMemoryRepository implements LifeMomentRepository {
  private moments: Map<string, LifeMoment> = new Map();

  async save(moment: LifeMoment): Promise<void> {
    this.moments.set(moment.getId().toString(), moment);
  }

  async remove(id: UUID): Promise<void> {
    this.moments.delete(id.toString());
  }

  async find(id: UUID): Promise<LifeMoment | null> {
    const moment = this.moments.get(id.toString());
    return moment || null;
  }

  async search(petId: UUID): Promise<LifeMoment[]> {
    return Array.from(this.moments.values()).filter(
      (moment) => moment.getPetId().toString() === petId.toString(),
    );
  }
}
