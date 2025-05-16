import { DomainException } from './DomainException';

export class UnsupportedEmptyStringException extends DomainException {
  readonly code = 'UNSUPPORTED_EMPTY_STRING';

  constructor() {
    super('Unsupported empty string');
    this.name = 'UnsupportedEmptyStringException';
  }
}
