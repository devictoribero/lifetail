import { PasswordHashValueObject } from './PasswordHashValueObject';
import { ValueObject } from './ValueObject';
import { UnsupportedEmptyPasswordException } from './exceptions/UnsupportedEmptyPasswordException';
import { PasswordTooShortException } from './exceptions/PasswordTooShortException';

describe('PasswordHashValueObject', () => {
  describe('Creation', () => {
    it('should throw an error if the password is empty', () => {
      expect(() => new PasswordHashValueObject('')).toThrow(PasswordTooShortException);
    });

    it('should throw an error if the password is whitespace', () => {
      expect(() => new PasswordHashValueObject('   ')).toThrow(PasswordTooShortException);
    });

    it('should throw an error if the password is too short', () => {
      expect(() => new PasswordHashValueObject('short')).toThrow(PasswordTooShortException);
    });

    it('should create a value object from a valid password', () => {
      const password = 'valid-password';
      const passwordValueObject = new PasswordHashValueObject(password);

      expect(passwordValueObject).toBeDefined();
      expect(passwordValueObject).toBeInstanceOf(ValueObject);
    });
  });

  describe('Transformation', () => {
    it('can transform the value to a string', () => {
      const password = 'valid-password';
      const passwordValueObject = new PasswordHashValueObject(password);

      const passwordString = passwordValueObject.toString();
      expect(typeof passwordString).toBe('string');
      expect(passwordString).toEqual(password);
    });
  });

  describe('Comparison', () => {
    it('can determine when two password value objects are equal', () => {
      const password = 'valid-password';
      const passwordValueObject1 = new PasswordHashValueObject(password);
      const passwordValueObject2 = new PasswordHashValueObject(password);

      expect(passwordValueObject1.equals(passwordValueObject2)).toBe(true);
    });

    it('can determine when two password value objects are different', () => {
      const password1 = 'valid-password-1';
      const password2 = 'valid-password-2';
      const passwordValueObject1 = new PasswordHashValueObject(password1);
      const passwordValueObject2 = new PasswordHashValueObject(password2);

      expect(passwordValueObject1.equals(passwordValueObject2)).toBe(false);
    });
  });
});
