import { DomainException } from './DomainException';

export class InvalidGenderException extends DomainException {
  readonly reason = 'INVALID_GENDER';

  constructor(gender: string) {
    super(`${gender} is not a valid gender.`);
    this.name = 'InvalidGenderException';
  }
}
