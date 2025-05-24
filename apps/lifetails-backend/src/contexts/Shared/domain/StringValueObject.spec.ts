import { StringValueObject } from './StringValueObject';
import { UnsupportedEmptyStringException } from './exceptions/UnsupportedEmptyStringException';

describe('StringValueObject', () => {
  describe('Creation', () => {
    it('should throw UnsupportedEmptyStringException if the string is empty', () => {
      expect(() => new StringValueObject('')).toThrow(UnsupportedEmptyStringException);
    });

    it('should throw UnsupportedEmptyStringException if the string only contains whitespace', () => {
      expect(() => new StringValueObject('   ')).toThrow(UnsupportedEmptyStringException);
    });

    it('should create a value object from a non-empty string', () => {
      const stringValueObject = new StringValueObject('test');
      expect(stringValueObject).toBeDefined();
      expect(stringValueObject).toBeInstanceOf(StringValueObject);
    });
  });

  describe('Serialization', () => {
    it('can convert the value to a string', () => {
      const stringValueObject = new StringValueObject('test');
      expect(stringValueObject.toString()).toBe('test');
    });
  });

  describe('Comparison', () => {
    it('can determine when two string value objects are equal', () => {
      const stringValueObject1 = new StringValueObject('test');
      const stringValueObject2 = new StringValueObject('test');
      expect(stringValueObject1.equals(stringValueObject2)).toBe(true);
    });

    it('can determine when two string value objects are different', () => {
      const stringValueObject1 = new StringValueObject('test');
      const stringValueObject2 = new StringValueObject('test2');
      expect(stringValueObject1.equals(stringValueObject2)).toBe(false);
    });
  });
});
