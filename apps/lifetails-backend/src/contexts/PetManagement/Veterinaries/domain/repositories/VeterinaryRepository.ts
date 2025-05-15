import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Veterinary } from '../entities/Veterinary';

export const VETERINARY_REPOSITORY = 'VETERINARY_REPOSITORY';

export interface VeterinaryRepository {
  save(vet: Veterinary): Promise<void>;
  remove(id: UUID): Promise<void>;
  find(id: UUID): Promise<Veterinary | null>;
}
