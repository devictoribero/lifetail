import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';

export class InvalidTokenException extends DomainException {
  readonly code = 'INVALID_TOKEN';

  constructor() {
    super('Invalid token');
    this.name = 'InvalidTokenException';
  }
}
