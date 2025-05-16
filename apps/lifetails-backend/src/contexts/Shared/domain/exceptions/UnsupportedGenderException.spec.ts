import { UnsupportedGenderException } from './UnsupportedGenderException';

describe('UnsupportedGenderException', () => {
  it('should be instance of UnsupportedGenderException', () => {
    const exception = new UnsupportedGenderException('male');

    expect(exception).toBeInstanceOf(Error);
    expect(exception.name).toBe('UnsupportedGenderException');
    expect(exception.code).toBe('UNSUPPORTED_GENDER');
    expect(exception.message).toBe('male is not a valid gender.');
  });
});
