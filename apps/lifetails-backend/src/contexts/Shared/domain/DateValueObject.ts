import { ValueObject } from './ValueObject';

export class DateValueObject extends ValueObject<Date> {
  public toISOString(): string {
    return new Date(this.value).toISOString();
  }
}
