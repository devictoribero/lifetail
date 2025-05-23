import { ValueObject } from './ValueObject';
import { InvalidDateException } from './exceptions/InvalidDateException';

export class DateValueObject extends ValueObject<Date> {
  constructor(value: Date) {
    if (isNaN(value.getTime())) {
      throw new InvalidDateException(value.toString());
    }
    super(value);
  }

  public toISOString(): string {
    return this.value.toISOString();
  }

  public toDate(): Date {
    return this.value;
  }

  public equals(other: DateValueObject): boolean {
    return this.value.toISOString() === other.value.toISOString();
  }
}
