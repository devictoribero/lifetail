import { DateValueObject } from './DateValueObject';
import { ValueObject } from './ValueObject';

describe('DateValueObject', () => {
  describe('Creation', () => {
    it('should throw an error if the date is invalid', () => {
      expect(() => new DateValueObject(new Date('invalid-date'))).toThrow();
    });

    it('should create a value object from a valid date', () => {
      const date = new Date('2021-01-01');
      const dateValueObject = new DateValueObject(date);

      expect(dateValueObject).toBeDefined();
      expect(dateValueObject).toBeInstanceOf(ValueObject);
    });
  });

  describe('Serialization', () => {
    it('can transform the value to a Date object', () => {
      const date = new Date('2021-01-01');
      const dateValueObject = new DateValueObject(date);

      const dateValue = dateValueObject.toDate();
      expect(dateValue).toBeInstanceOf(Date);
      expect(dateValue).toEqual(date);
    });

    it('can transform the value to an ISO string', () => {
      const date = new Date('2021-01-01');
      const dateValueObject = new DateValueObject(date);

      const isoString = dateValueObject.toISOString();
      expect(typeof isoString).toBe('string');
      expect(isoString).toEqual(date.toISOString());
    });
  });

  describe('Comparison', () => {
    it('can determine when two date value objects are equal', () => {
      const date = new Date('2021-01-01');
      const dateValueObject1 = new DateValueObject(date);
      const dateValueObject2 = new DateValueObject(date);

      expect(dateValueObject1.equals(dateValueObject2)).toBe(true);
    });

    it('can determine when two date value objects are different', () => {
      const date1 = new Date('2021-01-01');
      const date2 = new Date('2021-01-02');
      const dateValueObject1 = new DateValueObject(date1);
      const dateValueObject2 = new DateValueObject(date2);

      expect(dateValueObject1.equals(dateValueObject2)).toBe(false);
    });
  });
});
