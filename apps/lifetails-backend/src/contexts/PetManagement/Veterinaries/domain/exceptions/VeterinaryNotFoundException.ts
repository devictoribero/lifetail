import { UUID } from 'src/contexts/Shared/domain/UUID';

export class VeterinaryNotFoundException extends Error {
  constructor(id: UUID) {
    super(`Veterinary not found: ${id.toString()}`);
    this.name = 'VeterinaryNotFoundException';
  }
}
