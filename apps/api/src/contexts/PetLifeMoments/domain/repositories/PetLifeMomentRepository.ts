import { PetLifeMoment } from '../entities/PetLifeMoment';

export interface PetLifeMomentRepository {
  save(moment: PetLifeMoment): Promise<void>;
}
