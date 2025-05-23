import { PasswordTooShortException } from './exceptions/PasswordTooShortException';
import { UnsupportedEmptyPasswordException } from './exceptions/UnsupportedEmptyPasswordException';
import { StringValueObject } from './StringValueObject';
import { ValueObject } from './ValueObject';

export class PasswordHashValueObject extends StringValueObject {
  static readonly MIN_LENGTH = 8;

  constructor(value: string) {
    PasswordHashValueObject.ensureValidPasswordHash(value);
    super(value);
  }

  private static ensureValidPasswordHash(value: string): void {
    if (!value || value.trim().length === 0) {
      throw new PasswordTooShortException(PasswordHashValueObject.MIN_LENGTH);
    }

    if (value.length < PasswordHashValueObject.MIN_LENGTH) {
      throw new PasswordTooShortException(PasswordHashValueObject.MIN_LENGTH);
    }
  }
}
