import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';

export class EmailAlreadyInUseException extends DomainException {
  readonly reason = 'EMAIL_ALREADY_IN_USE';

  constructor() {
    super('Email is already in use');
    this.name = 'EmailAlreadyInUseException';
  }
}
