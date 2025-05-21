import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMoment } from '../entities/LifeMoment';

export const LIFE_MOMENT_REPOSITORY = 'LIFE_MOMENT_REPOSITORY';

export interface LifeMomentRepository {
  save(moment: LifeMoment): Promise<void>;
  find(id: UUID): Promise<LifeMoment | null>;
  search(petId: UUID): Promise<LifeMoment[]>;
}
