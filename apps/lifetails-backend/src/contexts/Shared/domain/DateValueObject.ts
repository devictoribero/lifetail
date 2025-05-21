import { ValueObject } from './ValueObject';

export class DateValueObject extends ValueObject<Date> {
  public toISOString(): string {
    return new Date(this.value).toISOString();
  }

  public toDate(): Date {
    return this.value;
  }

  public equals(other: DateValueObject): boolean {
    return this.value.toISOString() === other.value.toISOString();
  }
}
