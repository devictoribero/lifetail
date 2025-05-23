import { StringValueObject } from './StringValueObject';
import { InvalidEmailException } from './exceptions/InvalidEmailException';

export class EmailValueObject extends StringValueObject {
  constructor(value: string) {
    EmailValueObject.ensureValidEmail(value);
    super(value.trim());
  }

  private static ensureValidEmail(value: string): void {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      throw new InvalidEmailException(value);
    }

    if (!trimmedValue.includes('@')) {
      throw new InvalidEmailException(value);
    }

    const [localPart, domain] = trimmedValue.split('@');

    if (!localPart || !domain) {
      throw new InvalidEmailException(value);
    }

    if (domain.split('.').length < 2) {
      throw new InvalidEmailException(value);
    }
  }
}
