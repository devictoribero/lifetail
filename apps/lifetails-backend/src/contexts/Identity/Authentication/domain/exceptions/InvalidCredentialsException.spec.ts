import { InvalidCredentialsException } from './InvalidCredentialsException';

describe('InvalidCredentialsException', () => {
  it('should create an instance of InvalidCredentialsException', () => {
    const exception = new InvalidCredentialsException();

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Invalid email or password');
  });
});
