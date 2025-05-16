import { InvalidTokenException } from './InvalidTokenException';

describe('InvalidTokenException', () => {
  it('should be an instance of InvalidTokenException', () => {
    const exception = new InvalidTokenException();

    expect(exception).toBeInstanceOf(InvalidTokenException);
    expect(exception.name).toBe('InvalidTokenException');
    expect(exception.code).toBe('INVALID_TOKEN');
    expect(exception.message).toBe('Invalid token');
  });
});
