import { InvalidGenderException } from './InvalidGenderException';

describe('InvalidGenderException', () => {
  it('should be defined', () => {
    expect(InvalidGenderException).toBeDefined();
  });

  it('should be an instance of Error', () => {
    const error = new InvalidGenderException('invalid-gender');

    expect(error).toBeInstanceOf(InvalidGenderException);
    expect(error.message).toBe('The gender <invalid-gender> is invalid.');
  });
});
