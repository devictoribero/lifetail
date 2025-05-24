import { UUID } from './UUID';
import { ValueObject } from './ValueObject';

describe('UUID', () => {
  describe('Creation', () => {
    it('should throw an error if the UUID is invalid', () => {
      expect(() => new UUID('invalid-uuid')).toThrow();
    });

    it('should throw an error if the UUID is empty', () => {
      expect(() => new UUID('')).toThrow();
    });

    it('should throw an error if the UUID is whitespace', () => {
      expect(() => new UUID('   ')).toThrow();
    });

    it('should create a value object from a valid UUID', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const uuidValueObject = new UUID(uuid);

      expect(uuidValueObject).toBeDefined();
      expect(uuidValueObject).toBeInstanceOf(ValueObject);
    });

    it('should create a value object with a random UUID', () => {
      const uuidValueObject = UUID.generate();

      expect(uuidValueObject).toBeDefined();
      expect(uuidValueObject).toBeInstanceOf(ValueObject);
      expect(uuidValueObject.toString()).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      );
    });
  });

  describe('Serialization', () => {
    it('can transform the value to a string', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const uuidValueObject = new UUID(uuid);

      const uuidString = uuidValueObject.toString();
      expect(typeof uuidString).toBe('string');
      expect(uuidString).toEqual(uuid);
    });
  });

  describe('Comparison', () => {
    it('can determine when two UUID value objects are equal', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      const uuidValueObject1 = new UUID(uuid);
      const uuidValueObject2 = new UUID(uuid);

      expect(uuidValueObject1.equals(uuidValueObject2)).toBe(true);
    });

    it('can determine when two UUID value objects are different', () => {
      const uuid1 = '123e4567-e89b-12d3-a456-426614174000';
      const uuid2 = '123e4567-e89b-12d3-a456-426614174001';
      const uuidValueObject1 = new UUID(uuid1);
      const uuidValueObject2 = new UUID(uuid2);

      expect(uuidValueObject1.equals(uuidValueObject2)).toBe(false);
    });
  });
});
