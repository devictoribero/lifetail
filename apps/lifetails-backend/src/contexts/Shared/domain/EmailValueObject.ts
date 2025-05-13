import { ValueObject } from './ValueObject';

export class EmailValueObject extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValidEmail(value);
  }

  private ensureValidEmail(value: string): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      throw new Error(`The email <${value}> is not valid`);
    }
  }

  toString(): string {
    return this.value;
  }
}
