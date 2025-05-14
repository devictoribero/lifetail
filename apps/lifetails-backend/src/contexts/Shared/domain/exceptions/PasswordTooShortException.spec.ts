import { PasswordTooShortException } from './PasswordTooShortException';

describe('PasswordTooShortException', () => {
  it('should be defined', () => {
    expect(PasswordTooShortException).toBeDefined();
  });

  it('should be an instance of Error', () => {
    const error = new PasswordTooShortException('short');

    expect(error).toBeInstanceOf(PasswordTooShortException);
    expect(error.message).toBe('The password <short> is too short.');
  });
});
