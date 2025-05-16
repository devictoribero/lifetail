import { PasswordTooShortException } from './PasswordTooShortException';

describe('PasswordTooShortException', () => {
  it('should be an instance of PasswordTooShortException', () => {
    const error = new PasswordTooShortException(8);

    expect(error).toBeInstanceOf(PasswordTooShortException);
    expect(error.name).toBe('PasswordTooShortException');
    expect(error.code).toBe('PASSWORD_TOO_SHORT');
    expect(error.message).toBe('Password too short. Minimum length is 8.');
  });
});
