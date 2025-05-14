import { DateValueObject } from './DateValueObject';
import { ValueObject } from './ValueObject';

describe('DateValueObject', () => {
  it('should be defined', () => {
    expect(DateValueObject).toBeDefined();
  });

  it('should be an instance of ValueObject', () => {
    const dateValueObject = new DateValueObject(new Date());

    expect(dateValueObject).toBeInstanceOf(ValueObject);
  });

  it('can transform the value to date', () => {
    const date = new Date('2021-01-01');
    const dateValueObject = new DateValueObject(date);

    const dateValue = dateValueObject.toDate();
    expect(dateValue).toBeInstanceOf(Date);
    expect(dateValue).toEqual(date);
  });

  it('can transform the value to ISO string', () => {
    const date = new Date('2021-01-01');
    const dateValueObject = new DateValueObject(date);

    const isoString = dateValueObject.toISOString();
    expect(typeof isoString).toBe('string');
    expect(isoString).toEqual(date.toISOString());
  });
});
