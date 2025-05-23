import { LifeMomentType } from './LifeMomentType';
import { UnsupportedLifeMomentTypeException } from '../exceptions/UnsupportedLifeMomentTypeException';
import { ValueObject } from 'src/contexts/Shared/domain/ValueObject';
import { UnsupportedEmptyStringException } from 'src/contexts/Shared/domain/exceptions/UnsupportedEmptyStringException';

describe('LifeMomentType', () => {
  describe('Validation', () => {
    it('should throw an error if the life moment type is invalid', () => {
      expect(() => LifeMomentType.create('invalid-type')).toThrow(
        UnsupportedLifeMomentTypeException,
      );
    });

    it('should throw an error if the life moment type is empty', () => {
      expect(() => LifeMomentType.create('')).toThrow(UnsupportedEmptyStringException);
    });

    it('should throw an error if the life moment type is whitespace', () => {
      expect(() => LifeMomentType.create('   ')).toThrow(UnsupportedEmptyStringException);
    });
  });

  describe('Creation', () => {
    it('should create a value object from a valid life moment type', () => {
      const lifeMomentType = LifeMomentType.create('Achievement');

      expect(lifeMomentType).toBeDefined();
      expect(lifeMomentType).toBeInstanceOf(ValueObject);
    });

    it('should create a value object from a valid life moment type constant', () => {
      const lifeMomentType = LifeMomentType.Achievement;

      expect(lifeMomentType).toBeDefined();
      expect(lifeMomentType).toBeInstanceOf(ValueObject);
    });
  });

  describe('Transformation', () => {
    it('can transform the value to a string', () => {
      const lifeMomentType = LifeMomentType.create('Achievement');

      const stringValue = lifeMomentType.toString();
      expect(typeof stringValue).toBe('string');
      expect(stringValue).toEqual('Achievement');
    });
  });

  describe('Comparison', () => {
    it('can determine when two life moment type value objects are equal', () => {
      const lifeMomentType1 = LifeMomentType.create('Achievement');
      const lifeMomentType2 = LifeMomentType.create('Achievement');

      expect(lifeMomentType1.equals(lifeMomentType2)).toBe(true);
    });

    it('can determine when two life moment type value objects are different', () => {
      const lifeMomentType1 = LifeMomentType.create('Achievement');
      const lifeMomentType2 = LifeMomentType.create('Anniversary');

      expect(lifeMomentType1.equals(lifeMomentType2)).toBe(false);
    });
  });

  describe('Static methods', () => {
    it('should create a life moment type using the create method', () => {
      const lifeMomentType = LifeMomentType.create('Achievement');

      expect(lifeMomentType).toBeDefined();
      expect(lifeMomentType).toBeInstanceOf(ValueObject);
      expect(lifeMomentType.toString()).toEqual('Achievement');
    });

    it('should reconstruct a life moment type using the fromPrimitives method', () => {
      const lifeMomentType = LifeMomentType.fromPrimitives('Achievement');

      expect(lifeMomentType).toBeDefined();
      expect(lifeMomentType).toBeInstanceOf(ValueObject);
      expect(lifeMomentType.toString()).toEqual('Achievement');
    });
  });

  describe('Constants', () => {
    it('should define all supported life moment types', () => {
      expect(LifeMomentType.Achievement).toBeDefined();
      expect(LifeMomentType.Anniversary).toBeDefined();
      expect(LifeMomentType.Arrival).toBeDefined();
      expect(LifeMomentType.Bath).toBeDefined();
      expect(LifeMomentType.Death).toBeDefined();
      expect(LifeMomentType.DietChange).toBeDefined();
      expect(LifeMomentType.Discomfort).toBeDefined();
      expect(LifeMomentType.Excursion).toBeDefined();
      expect(LifeMomentType.Exercise).toBeDefined();
      expect(LifeMomentType.Gift).toBeDefined();
      expect(LifeMomentType.Goodbye).toBeDefined();
      expect(LifeMomentType.GroomingVisit).toBeDefined();
      expect(LifeMomentType.Hydration).toBeDefined();
      expect(LifeMomentType.Illness).toBeDefined();
      expect(LifeMomentType.Injury).toBeDefined();
      expect(LifeMomentType.Medication).toBeDefined();
      expect(LifeMomentType.Move).toBeDefined();
      expect(LifeMomentType.NailCut).toBeDefined();
      expect(LifeMomentType.Play).toBeDefined();
      expect(LifeMomentType.Socialization).toBeDefined();
      expect(LifeMomentType.SpecialMeal).toBeDefined();
      expect(LifeMomentType.Surgery).toBeDefined();
      expect(LifeMomentType.Training).toBeDefined();
      expect(LifeMomentType.Vaccination).toBeDefined();
      expect(LifeMomentType.VeterinaryVisit).toBeDefined();
      expect(LifeMomentType.Walk).toBeDefined();
    });
  });
});
