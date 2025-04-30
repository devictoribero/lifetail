import { InvalidPetLifeThemeException } from './InvalidPetLifeThemeException';

describe('InvalidPetLifeThemeException', () => {
  it('should create an instance of InvalidPetLifeThemeException', () => {
    const exception = new InvalidPetLifeThemeException('invalid-theme-value');

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Unknown pet life theme: invalid-theme-value');
  });
});
