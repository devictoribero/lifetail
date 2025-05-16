import { PasswordTooShortException } from './exceptions/PasswordTooShortException';
import { UnsupportedEmptyPasswordException } from './exceptions/UnsupportedEmptyPasswordException';
import { ValueObject } from './ValueObject';

export class PasswordHashValueObject extends ValueObject<string> {
  static readonly MIN_LENGTH = 8;

  constructor(value: string) {
    super(value);
    this.ensureValidPasswordHash(value);
  }

  private ensureValidPasswordHash(value: string): void {
    if (!value || value.length === 0) {
      throw new UnsupportedEmptyPasswordException();
    }

    if (value.length < PasswordHashValueObject.MIN_LENGTH) {
      throw new PasswordTooShortException(PasswordHashValueObject.MIN_LENGTH);
    }
  }

  toString(): string {
    return this.value;
  }
}
