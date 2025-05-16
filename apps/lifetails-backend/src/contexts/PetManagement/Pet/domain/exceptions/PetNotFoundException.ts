import { UUID } from 'src/contexts/Shared/domain/UUID';

export class PetNotFoundException extends Error {
  constructor(id: UUID) {
    super(`Pet not found: ${id.toString()}`);
    this.name = 'PetNotFoundException';
  }
}
