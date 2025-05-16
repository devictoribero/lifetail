import { InvalidCredentialsException } from './InvalidCredentialsException';

describe('InvalidCredentialsException', () => {
  it('should create an instance of InvalidCredentialsException', () => {
    const exception = new InvalidCredentialsException();

    expect(exception).toBeInstanceOf(InvalidCredentialsException);
    expect(exception.name).toBe('InvalidCredentialsException');
    expect(exception.code).toBe('INVALID_CREDENTIALS');
    expect(exception.message).toBe('Invalid email or password');
  });
});
