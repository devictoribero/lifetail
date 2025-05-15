import { UnsupportedEmptyPasswordException } from './UnsupportedEmptyPasswordException';

describe('UnsupportedEmptyPasswordException', () => {
  it('should be defined', () => {
    expect(UnsupportedEmptyPasswordException).toBeDefined();
  });

  it('should be an instance of UnsupportedEmptyPasswordException', () => {
    const error = new UnsupportedEmptyPasswordException();

    expect(error).toBeInstanceOf(UnsupportedEmptyPasswordException);
    expect(error.message).toBe('Unsupported empty password.');
  });
});
