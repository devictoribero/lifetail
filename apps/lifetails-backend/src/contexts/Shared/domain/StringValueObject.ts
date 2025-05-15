import { ValueObject } from './ValueObject';
import { UnsupportedEmptyStringException } from './exceptions/UnsupportedEmptyStringException';

export class StringValueObject extends ValueObject<string> {
  constructor(value: string) {
    if (value.trim() === '') {
      throw new UnsupportedEmptyStringException();
    }
    super(value);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: StringValueObject): boolean {
    return this.value.toString() === other.value.toString();
  }
}
