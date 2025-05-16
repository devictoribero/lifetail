import { DomainException } from './DomainException';

export class UnsupportedEmptyPasswordException extends DomainException {
  readonly code = 'UNSUPPORTED_EMPTY_PASSWORD';

  constructor() {
    super(`Unsupported empty password.`);
    this.name = 'UnsupportedEmptyPasswordException';
  }
}
