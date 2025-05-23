import { EmailValueObject } from './EmailValueObject';
import { ValueObject } from './ValueObject';
import { InvalidEmailException } from './exceptions/InvalidEmailException';

describe('EmailValueObject', () => {
  describe('Creation', () => {
    it('should throw an error if the email is empty', () => {
      expect(() => new EmailValueObject('')).toThrow(InvalidEmailException);
    });

    it('should throw an error if the email is whitespace', () => {
      expect(() => new EmailValueObject('   ')).toThrow(InvalidEmailException);
    });

    it('should throw an error if the email has no @ symbol', () => {
      expect(() => new EmailValueObject('invalid-email')).toThrow(InvalidEmailException);
    });

    it('should throw an error if the email has no local part', () => {
      expect(() => new EmailValueObject('@domain.com')).toThrow(InvalidEmailException);
    });

    it('should throw an error if the email has no domain', () => {
      expect(() => new EmailValueObject('user@')).toThrow(InvalidEmailException);
    });

    it('should throw an error if the email domain has no TLD', () => {
      expect(() => new EmailValueObject('user@domain')).toThrow(InvalidEmailException);
    });

    it('should create a value object from a valid email', () => {
      const email = 'test@example.com';
      const emailValueObject = new EmailValueObject(email);

      expect(emailValueObject).toBeDefined();
      expect(emailValueObject).toBeInstanceOf(ValueObject);
    });

    it('should trim whitespace from the email', () => {
      const email = '  test@example.com  ';
      const emailValueObject = new EmailValueObject(email);

      expect(emailValueObject.toString()).toBe('test@example.com');
    });
  });

  describe('Transformation', () => {
    it('can transform the value to a string', () => {
      const email = 'test@example.com';
      const emailValueObject = new EmailValueObject(email);

      const emailString = emailValueObject.toString();
      expect(typeof emailString).toBe('string');
      expect(emailString).toEqual(email);
    });
  });

  describe('Comparison', () => {
    it('can determine when two email value objects are equal', () => {
      const email = 'test@example.com';
      const emailValueObject1 = new EmailValueObject(email);
      const emailValueObject2 = new EmailValueObject(email);

      expect(emailValueObject1.equals(emailValueObject2)).toBe(true);
    });

    it('can determine when two email value objects are different', () => {
      const email1 = 'test1@example.com';
      const email2 = 'test2@example.com';
      const emailValueObject1 = new EmailValueObject(email1);
      const emailValueObject2 = new EmailValueObject(email2);

      expect(emailValueObject1.equals(emailValueObject2)).toBe(false);
    });
  });
});
