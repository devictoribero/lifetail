import { DomainException } from './DomainException';

export class InvalidEmailException extends DomainException {
  readonly code = 'INVALID_EMAIL';

  constructor(email: string) {
    super(`The email <${email}> is not valid.`);
    this.name = 'InvalidEmailException';
  }
}
