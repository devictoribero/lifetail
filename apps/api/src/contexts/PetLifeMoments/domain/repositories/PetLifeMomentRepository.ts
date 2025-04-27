import { PetLifeMoment } from '../entities/PetLifeMoment';

export interface PetLifeMomentRepository {
  save(petLifeMoment: PetLifeMoment): Promise<void>;
}
