import { UnsupportedEmptyStringException } from './UnsupportedEmptyStringException';

describe('UnsupportedEmptyStringException', () => {
  it('should create an exception with the expected message', () => {
    const exception = new UnsupportedEmptyStringException();

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Unsupported empty string');
    expect(exception.name).toBe('UnsupportedEmptyStringException');
  });
});
