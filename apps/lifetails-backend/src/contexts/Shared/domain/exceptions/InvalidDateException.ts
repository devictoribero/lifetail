import { DomainException } from './DomainException';

export class InvalidDateException extends DomainException {
  readonly code = 'INVALID_DATE';

  constructor(date: string) {
    super(`The date <${date}> is not valid.`);
    this.name = 'InvalidDateException';
  }
}
