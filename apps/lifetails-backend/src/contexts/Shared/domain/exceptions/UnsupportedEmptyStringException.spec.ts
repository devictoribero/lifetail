import { UnsupportedEmptyStringException } from './UnsupportedEmptyStringException';

describe('UnsupportedEmptyStringException', () => {
  it('should be defined', () => {
    expect(UnsupportedEmptyStringException).toBeDefined();
  });

  it('should be instance of UnsupportedEmptyStringException', () => {
    const exception = new UnsupportedEmptyStringException();

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Unsupported empty string');
    expect(exception.name).toBe('UnsupportedEmptyStringException');
  });
});
