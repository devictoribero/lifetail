import { DomainException } from './DomainException';

export class PasswordTooShortException extends DomainException {
  readonly reason = 'PASSWORD_TOO_SHORT';

  constructor(minLength: number) {
    super(`Password too short. Minimum length is ${minLength}.`);
    this.name = 'PasswordTooShortException';
  }
}
