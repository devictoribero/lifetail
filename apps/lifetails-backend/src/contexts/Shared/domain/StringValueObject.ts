import { ValueObject } from './ValueObject';

export class StringValueObject extends ValueObject<string> {
  public toString(): string {
    return this.value;
  }
}
