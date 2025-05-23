import { DomainException } from './DomainException';

export class UnsupportedEmptyLanguageException extends DomainException {
  readonly code = 'UNSUPPORTED_EMPTY_LANGUAGE';

  constructor() {
    super('Unsupported empty language.');
    this.name = 'UnsupportedEmptyLanguageException';
  }
}
