import { UnsupportedEmptyPasswordException } from './UnsupportedEmptyPasswordException';

describe('UnsupportedEmptyPasswordException', () => {
  it('should be an instance of UnsupportedEmptyPasswordException', () => {
    const error = new UnsupportedEmptyPasswordException();

    expect(error).toBeInstanceOf(UnsupportedEmptyPasswordException);
    expect(error.name).toBe('UnsupportedEmptyPasswordException');
    expect(error.reason).toBe('UNSUPPORTED_EMPTY_PASSWORD');
    expect(error.message).toBe('Unsupported empty password.');
  });
});
