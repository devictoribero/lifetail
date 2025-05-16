import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';

export class VeterinaryNameTooShortException extends DomainException {
  readonly reason = 'VETERINARY_NAME_TOO_SHORT';

  constructor() {
    super('Veterinary name must have at least 3 characters');
    this.name = 'VeterinaryNameTooShortException';
  }
}
