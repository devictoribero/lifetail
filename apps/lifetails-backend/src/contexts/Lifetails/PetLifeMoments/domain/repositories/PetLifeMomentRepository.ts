import { PetLifeMoment } from '../entities/PetLifeMoment';

export interface PetLifeMomentRepository {
  save(moment: PetLifeMoment): Promise<void>;
  // Data is soft-deleted meaning it's not physically removed from the database
  remove(id: string): Promise<void>;
  find(id: string): Promise<PetLifeMoment | null>;
}
