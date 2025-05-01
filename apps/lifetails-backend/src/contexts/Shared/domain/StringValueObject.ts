import { ValueObject } from './ValueObject';

export class StringValueObject extends ValueObject<string> {
  public toString(): string {
    return this.value;
  }

  public equals(other: StringValueObject): boolean {
    return this.value === other.value;
  }
}
