import { UnsupportedGenderException } from './UnsupportedGenderException';

describe('UnsupportedGenderException', () => {
  it('should be an instance of UnsupportedGenderException', () => {
    const error = new UnsupportedGenderException('invalid-gender');

    expect(error).toBeInstanceOf(UnsupportedGenderException);
    expect(error.name).toBe('UnsupportedGenderException');
    expect(error.code).toBe('UNSUPPORTED_GENDER');
    expect(error.message).toBe('invalid-gender is not a valid gender.');
  });
});
