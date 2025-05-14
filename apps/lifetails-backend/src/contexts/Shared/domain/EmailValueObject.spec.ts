import { EmailValueObject } from './EmailValueObject';

describe('EmailValueObject', () => {
  it('should throw an error if the email is not valid', () => {
    expect(() => new EmailValueObject('random_string')).toThrow(
      'The email <random_string> is not valid',
    );
  });

  it('should create a value object from a string', () => {
    const emailValueObject = new EmailValueObject('test@test.com');
    expect(emailValueObject).toBeDefined();
  });

  it('can convert the value of an email value object to a string', () => {
    const emailValueObject = new EmailValueObject('test@test.com');
    expect(emailValueObject.toString()).toBe('test@test.com');
  });
});
