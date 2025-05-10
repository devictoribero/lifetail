import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { Pet } from '../entities/Pet';

export const PET_REPOSITORY = 'PET_REPOSITORY';

export interface PetRepository {
  save(pet: Pet): Promise<void>;
  remove(id: UUID): Promise<void>;
  find(id: UUID): Promise<Pet | null>;
  findByOwner(ownerId: UUID): Promise<Pet[]>;
}
