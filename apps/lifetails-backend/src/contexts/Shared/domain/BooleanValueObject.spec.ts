import { BooleanValueObject } from './BooleanValueObject';
import { ValueObject } from './ValueObject';

describe('BooleanValueObject', () => {
  describe('Creation', () => {
    it('should create a value object from a valid boolean', () => {
      const booleanValueObject = new BooleanValueObject(true);

      expect(booleanValueObject).toBeDefined();
      expect(booleanValueObject).toBeInstanceOf(ValueObject);
    });
  });

  describe('Transformation', () => {
    it('can transform the value to a boolean', () => {
      const booleanValueObject = new BooleanValueObject(true);

      const booleanValue = booleanValueObject.getValue();
      expect(typeof booleanValue).toBe('boolean');
      expect(booleanValue).toBe(true);
    });
  });

  describe('Comparison', () => {
    it('can determine when two boolean value objects are equal', () => {
      const booleanValueObject1 = new BooleanValueObject(true);
      const booleanValueObject2 = new BooleanValueObject(true);

      expect(booleanValueObject1.equals(booleanValueObject2)).toBe(true);
    });

    it('can determine when two boolean value objects are different', () => {
      const booleanValueObject1 = new BooleanValueObject(true);
      const booleanValueObject2 = new BooleanValueObject(false);

      expect(booleanValueObject1.equals(booleanValueObject2)).toBe(false);
    });
  });
});
