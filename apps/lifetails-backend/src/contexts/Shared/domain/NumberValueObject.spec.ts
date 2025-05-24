import { NumberValueObject } from './NumberValueObject';
import { ValueObject } from './ValueObject';

describe('NumberValueObject', () => {
  describe('Creation', () => {
    it('should throw an error if the value is NaN', () => {
      expect(() => new NumberValueObject(NaN)).toThrow('The value is not a valid number');
    });

    it('should create a value object from a valid number', () => {
      const numberValueObject = new NumberValueObject(42);

      expect(numberValueObject).toBeDefined();
      expect(numberValueObject).toBeInstanceOf(ValueObject);
    });
  });

  describe('Serialization', () => {
    it('can transform the value to a number', () => {
      const numberValueObject = new NumberValueObject(42);

      const numberValue = numberValueObject.getValue();
      expect(typeof numberValue).toBe('number');
      expect(numberValue).toBe(42);
    });
  });

  describe('Comparison', () => {
    it('can determine when two number value objects are equal', () => {
      const numberValueObject1 = new NumberValueObject(42);
      const numberValueObject2 = new NumberValueObject(42);

      expect(numberValueObject1.equals(numberValueObject2)).toBe(true);
    });

    it('can determine when two number value objects are different', () => {
      const numberValueObject1 = new NumberValueObject(42);
      const numberValueObject2 = new NumberValueObject(43);

      expect(numberValueObject1.equals(numberValueObject2)).toBe(false);
    });
  });
});
