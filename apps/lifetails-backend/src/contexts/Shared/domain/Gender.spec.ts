import { Gender } from './Gender';
import { UnsupportedGenderException } from './exceptions/UnsupportedGenderException';
import { ValueObject } from './ValueObject';

const SUPPORTED_GENDERS = [
  { name: 'MALE', value: Gender.MALE },
  { name: 'FEMALE', value: Gender.FEMALE },
];

describe('Gender', () => {
  describe('Validation', () => {
    it('should throw an error if the gender is invalid', () => {
      expect(() => Gender.create('invalid-gender')).toThrow(UnsupportedGenderException);
    });

    it('should throw an error if the gender is empty', () => {
      expect(() => Gender.create('')).toThrow(UnsupportedGenderException);
    });

    it('should throw an error if the gender is whitespace', () => {
      expect(() => Gender.create('   ')).toThrow(UnsupportedGenderException);
    });
  });

  describe('Creation', () => {
    it('should create a value object from a valid gender', () => {
      const gender = Gender.create('MALE');

      expect(gender).toBeDefined();
      expect(gender).toBeInstanceOf(ValueObject);
    });

    it('should create a value object from a valid gender enum', () => {
      const gender = Gender.MALE;

      expect(gender).toBeDefined();
      expect(gender).toBeInstanceOf(ValueObject);
    });
  });

  describe('Transformation', () => {
    it('can transform the value to a string', () => {
      const gender = Gender.create('MALE');

      const stringValue = gender.toString();
      expect(typeof stringValue).toBe('string');
      expect(stringValue).toEqual('MALE');
    });
  });

  describe('Comparison', () => {
    it('can determine when two gender value objects are equal', () => {
      const gender1 = Gender.create('MALE');
      const gender2 = Gender.create('MALE');

      expect(gender1.equals(gender2)).toBe(true);
    });

    it('can determine when two gender value objects are different', () => {
      const gender1 = Gender.create('MALE');
      const gender2 = Gender.create('FEMALE');

      expect(gender1.equals(gender2)).toBe(false);
    });
  });

  SUPPORTED_GENDERS.forEach((gender) => {
    describe(`${gender.name} gender`, () => {
      it('should be defined', () => {
        expect(gender.value).toBeDefined();
      });

      it('should be an instance of Gender', () => {
        expect(gender.value).toBeInstanceOf(Gender);
      });

      it('should be an instance of ValueObject', () => {
        expect(gender.value).toBeInstanceOf(ValueObject);
      });

      it('should be equal to itself', () => {
        expect(gender.value.equals(gender.value)).toBe(true);
      });

      it('should be equal to another instance with the same value', () => {
        const otherGender = Gender.create(gender.value.toString());
        expect(gender.value.equals(otherGender)).toBe(true);
      });

      it('should not be equal to another instance with a different value', () => {
        const otherGender = Gender.create(gender.name === 'MALE' ? 'FEMALE' : 'MALE');
        expect(gender.value.equals(otherGender)).toBe(false);
      });
    });
  });
});
