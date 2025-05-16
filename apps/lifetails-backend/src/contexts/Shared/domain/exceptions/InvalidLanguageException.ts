import { DomainException } from './DomainException';

export class InvalidLanguageException extends DomainException {
  readonly code = 'INVALID_LANGUAGE';

  constructor(language: string) {
    super(`${language} is not a valid language.`);
    this.name = 'InvalidLanguageException';
  }
}
