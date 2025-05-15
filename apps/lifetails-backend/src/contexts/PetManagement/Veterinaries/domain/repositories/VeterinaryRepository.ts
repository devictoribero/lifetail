import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Veterinary } from '../entities/Veterinary';

export const VETERINARY_REPOSITORY = 'VeterinaryRepository';

export interface VeterinaryRepository {
  save(veterinary: Veterinary): Promise<void>;
  find(id: UUID): Promise<Veterinary | null>;
}
