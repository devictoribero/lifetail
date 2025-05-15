import { UUID } from 'src/contexts/Shared/domain/UUID';

export class LifeMomentNotFoundException extends Error {
  constructor(id: UUID) {
    super(`Life moment not found: ${id.toString()}`);
    this.name = 'LifeMomentNotFoundException';
  }
}
