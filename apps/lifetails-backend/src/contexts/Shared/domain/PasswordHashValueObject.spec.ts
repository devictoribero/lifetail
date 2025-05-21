import { PasswordTooShortException } from './exceptions/PasswordTooShortException';
import { UnsupportedEmptyPasswordException } from './exceptions/UnsupportedEmptyPasswordException';
import { PasswordHashValueObject } from './PasswordHashValueObject';

describe('PasswordHashValueObject', () => {
  describe('Validation', () => {
    it('should throw UnsupportedEmptyPasswordException if the password hash is empty', () => {
      expect(() => new PasswordHashValueObject('')).toThrow(
        new UnsupportedEmptyPasswordException(),
      );
    });

    it('should throw PasswordTooShortException if the password hash is too short', () => {
      expect(() => new PasswordHashValueObject('short')).toThrow(new PasswordTooShortException(8));
    });
  });

  describe('Creation', () => {
    it('should create a value object from a string', () => {
      const passwordHashValueObject = new PasswordHashValueObject('really-long-password');
      expect(passwordHashValueObject).toBeDefined();
    });
  });

  describe('Transformation', () => {
    it('can convert the value of a password hash value object to a string', () => {
      const passwordHashValueObject = new PasswordHashValueObject('really-long-password');
      expect(passwordHashValueObject.toString()).toBe('really-long-password');
    });
  });
});
