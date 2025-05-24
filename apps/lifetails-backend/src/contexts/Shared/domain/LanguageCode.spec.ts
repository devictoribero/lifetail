import { LanguageCode, LanguageCodeEnum } from './LanguageCode';
import { InvalidLanguageException } from './exceptions/InvalidLanguageException';
import { ValueObject } from './ValueObject';
import { UnsupportedEmptyLanguageException } from './exceptions/UnsupportedEmptyLanguageException';

const SUPPORTED_LANGUAGES = [
  { name: 'English', value: LanguageCode.English },
  { name: 'Spanish', value: LanguageCode.Spanish },
];

describe('LanguageCode', () => {
  describe('Creation', () => {
    it('should throw an error if the language code is invalid', () => {
      expect(() => LanguageCode.create('invalid-language')).toThrow(InvalidLanguageException);
    });

    it('should throw an error if the language code is empty', () => {
      expect(() => LanguageCode.create('')).toThrow(UnsupportedEmptyLanguageException);
    });

    it('should throw an error if the language code is whitespace', () => {
      expect(() => LanguageCode.create('   ')).toThrow(UnsupportedEmptyLanguageException);
    });

    it('should create a value object from a valid language code', () => {
      const languageCode = 'EN';
      const languageCodeValueObject = LanguageCode.create(languageCode);

      expect(languageCodeValueObject).toBeDefined();
      expect(languageCodeValueObject).toBeInstanceOf(ValueObject);
    });
  });

  describe('Serialization', () => {
    it('can transform the value to a string', () => {
      const languageCode = 'EN';
      const languageCodeValueObject = LanguageCode.create(languageCode);

      const languageCodeString = languageCodeValueObject.toString();
      expect(typeof languageCodeString).toBe('string');
      expect(languageCodeString).toEqual(languageCode);
    });
  });

  describe('Comparison', () => {
    it('can determine when two language code value objects are equal', () => {
      const languageCode = 'EN';
      const languageCodeValueObject1 = LanguageCode.create(languageCode);
      const languageCodeValueObject2 = LanguageCode.create(languageCode);

      expect(languageCodeValueObject1.equals(languageCodeValueObject2)).toBe(true);
    });

    it('can determine when two language code value objects are different', () => {
      const languageCode1 = 'EN';
      const languageCode2 = 'ES';
      const languageCodeValueObject1 = LanguageCode.create(languageCode1);
      const languageCodeValueObject2 = LanguageCode.create(languageCode2);

      expect(languageCodeValueObject1.equals(languageCodeValueObject2)).toBe(false);
    });
  });

  describe('Static methods', () => {
    it('should create a language code using the create method', () => {
      const languageCode = LanguageCode.create('EN');

      expect(languageCode).toBeDefined();
      expect(languageCode).toBeInstanceOf(ValueObject);
      expect(languageCode.toString()).toEqual('EN');
    });

    it('should reconstruct a language code using the fromPrimitives method', () => {
      const languageCode = LanguageCode.fromPrimitives('EN');

      expect(languageCode).toBeDefined();
      expect(languageCode).toBeInstanceOf(ValueObject);
      expect(languageCode.toString()).toEqual('EN');
    });
  });

  SUPPORTED_LANGUAGES.forEach((language) => {
    describe(`${language.name} language`, () => {
      it('should be defined', () => {
        expect(language.value).toBeDefined();
      });

      it('should be an instance of LanguageCode', () => {
        expect(language.value).toBeInstanceOf(LanguageCode);
      });

      it('should be an instance of ValueObject', () => {
        expect(language.value).toBeInstanceOf(ValueObject);
      });

      it('should be equal to itself', () => {
        expect(language.value.equals(language.value)).toBe(true);
      });

      it('should be equal to another instance with the same value', () => {
        const otherLanguage = LanguageCode.create(language.value.toString());
        expect(language.value.equals(otherLanguage)).toBe(true);
      });

      it('should not be equal to another instance with a different value', () => {
        const otherLanguage = LanguageCode.create(language.name === 'English' ? 'ES' : 'EN');
        expect(language.value.equals(otherLanguage)).toBe(false);
      });
    });
  });
});
