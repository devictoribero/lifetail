import { InvalidEmailException } from './InvalidEmailException';

describe('InvalidEmailException', () => {
  it('should be an instance of InvalidEmailException', () => {
    const email = 'invalid-email';
    const error = new InvalidEmailException(email);

    expect(error).toBeInstanceOf(InvalidEmailException);
    expect(error.name).toBe('InvalidEmailException');
    expect(error.code).toBe('INVALID_EMAIL');
    expect(error.message).toBe(`The email <${email}> is not valid.`);
  });
});
