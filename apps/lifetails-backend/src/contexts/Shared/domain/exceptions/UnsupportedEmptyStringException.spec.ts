import { UnsupportedEmptyStringException } from './UnsupportedEmptyStringException';

describe('UnsupportedEmptyStringException', () => {
  it('should be instance of UnsupportedEmptyStringException', () => {
    const exception = new UnsupportedEmptyStringException();

    expect(exception).toBeInstanceOf(Error);
    expect(exception.name).toBe('UnsupportedEmptyStringException');
    expect(exception.code).toBe('UNSUPPORTED_EMPTY_STRING');
    expect(exception.message).toBe('Unsupported empty string');
  });
});
