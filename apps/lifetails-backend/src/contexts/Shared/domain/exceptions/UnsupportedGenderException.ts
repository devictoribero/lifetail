import { DomainException } from './DomainException';

export class UnsupportedGenderException extends DomainException {
  readonly code = 'UNSUPPORTED_GENDER';

  constructor(gender: string) {
    super(`${gender} is not a valid gender.`);
    this.name = 'UnsupportedGenderException';
  }
}
