import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { LifeMoment } from '../entities/LifeMoment';

export const LIFE_MOMENT_REPOSITORY = 'LIFE_MOMENT_REPOSITORY';

export interface LifeMomentRepository {
  save(moment: LifeMoment): Promise<void>;
  // Data is soft-deleted meaning it's not physically removed from the database
  remove(id: UUID): Promise<void>;
  find(id: UUID): Promise<LifeMoment | null>;
}
