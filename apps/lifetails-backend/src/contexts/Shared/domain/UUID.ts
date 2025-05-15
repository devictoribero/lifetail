import { randomUUID } from 'crypto';
import { ValueObject } from './ValueObject';

export class UUID extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.ensureValidUUID(value);
  }

  static generate(): UUID {
    return new UUID(randomUUID());
  }

  private ensureValidUUID(id: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new Error(`The value <${id}> is not a valid UUID`);
    }
  }

  toString(): string {
    return this.value;
  }
}
