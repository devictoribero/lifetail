import { ValueObject } from './ValueObject';

export class NumberValueObject extends ValueObject<number> {
  constructor(value: number) {
    if (isNaN(value)) {
      throw new Error('The value is not a valid number');
    }
    super(value);
  }

  public getValue(): number {
    return this.value;
  }

  public equals(other: NumberValueObject): boolean {
    return this.value === other.value;
  }

  public toNumber(): number {
    return this.value;
  }
}
