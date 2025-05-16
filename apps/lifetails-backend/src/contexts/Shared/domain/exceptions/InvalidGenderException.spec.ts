import { InvalidGenderException } from './InvalidGenderException';

describe('InvalidGenderException', () => {
  it('should be an instance of InvalidGenderException', () => {
    const error = new InvalidGenderException('invalid-gender');

    expect(error).toBeInstanceOf(InvalidGenderException);
    expect(error.name).toBe('InvalidGenderException');
    expect(error.code).toBe('INVALID_GENDER');
    expect(error.message).toBe('invalid-gender is not a valid gender.');
  });
});
