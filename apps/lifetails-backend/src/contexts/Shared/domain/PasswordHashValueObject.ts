import { PasswordTooShortException } from './exceptions/PasswordTooShortException';
import { UnsupportedEmptyPasswordException } from './exceptions/UnsupportedEmptyPasswordException';
import { ValueObject } from './ValueObject';

export class PasswordHashValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValidPasswordHash(value);
  }

  private ensureValidPasswordHash(value: string): void {
    if (!value || value.length === 0) {
      throw new UnsupportedEmptyPasswordException();
    }

    if (value.length < 8) {
      throw new PasswordTooShortException(value);
    }
  }

  toString(): string {
    return this.value;
  }
}
