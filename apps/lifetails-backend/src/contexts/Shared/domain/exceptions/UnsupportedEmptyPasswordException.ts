import { DomainException } from './DomainException';

export class UnsupportedEmptyPasswordException extends DomainException {
  readonly reason = 'UNSUPPORTED_EMPTY_PASSWORD';

  constructor() {
    super(`Unsupported empty password.`);
    this.name = 'UnsupportedEmptyPasswordException';
  }
}
