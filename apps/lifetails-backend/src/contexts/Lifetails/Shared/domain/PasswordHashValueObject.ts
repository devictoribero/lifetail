import { ValueObject } from './ValueObject';

export class PasswordHashValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValidPasswordHash(value);
  }

  private ensureValidPasswordHash(value: string): void {
    if (!value || value.length === 0) {
      throw new Error('Password hash cannot be empty');
    }
  }

  toString(): string {
    return this.value;
  }
}
