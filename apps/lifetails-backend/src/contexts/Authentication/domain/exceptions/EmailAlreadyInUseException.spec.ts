import { EmailAlreadyInUseException } from './EmailAlreadyInUseException';

describe('EmailAlreadyInUseException', () => {
  it('should create an instance of EmailAlreadyInUseException', () => {
    const exception = new EmailAlreadyInUseException();

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Email is already in use');
  });
});
