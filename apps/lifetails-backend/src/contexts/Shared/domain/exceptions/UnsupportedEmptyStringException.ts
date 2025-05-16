import { DomainException } from './DomainException';

export class UnsupportedEmptyStringException extends DomainException {
  readonly reason = 'UNSUPPORTED_EMPTY_STRING';

  constructor() {
    super('Unsupported empty string');
    this.name = 'UnsupportedEmptyStringException';
  }
}
