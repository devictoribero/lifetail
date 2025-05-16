import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';

export class LifeMomentNotFoundException extends DomainException {
  readonly code = 'LIFE_MOMENT_NOT_FOUND';

  constructor() {
    super(`Life moment not found`);
    this.name = 'LifeMomentNotFoundException';
  }
}
