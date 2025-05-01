import { ValueObject } from './ValueObject';

export class BooleanValueObject extends ValueObject<boolean> {
  public getValue(): boolean {
    return this.value;
  }
}
