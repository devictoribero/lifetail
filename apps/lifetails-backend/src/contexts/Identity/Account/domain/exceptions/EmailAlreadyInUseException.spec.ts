import { EmailAlreadyInUseException } from './EmailAlreadyInUseException';

describe('EmailAlreadyInUseException', () => {
  it('should create an instance of EmailAlreadyInUseException', () => {
    const exception = new EmailAlreadyInUseException();

    expect(exception).toBeInstanceOf(EmailAlreadyInUseException);
    expect(exception.name).toBe('EmailAlreadyInUseException');
    expect(exception.code).toBe('EMAIL_ALREADY_IN_USE');
    expect(exception.message).toBe('Email is already in use');
  });
});
