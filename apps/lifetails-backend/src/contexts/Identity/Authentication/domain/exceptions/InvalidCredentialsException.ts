import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';

export class InvalidCredentialsException extends DomainException {
  readonly code = 'INVALID_CREDENTIALS';

  constructor() {
    super('Invalid email or password');
    this.name = 'InvalidCredentialsException';
  }
}
