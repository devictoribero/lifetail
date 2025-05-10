import { InvalidLifeThemeException } from './InvalidLifeThemeException';

describe('InvalidLifeThemeException', () => {
  it('should create an instance of InvalidLifeThemeException', () => {
    const exception = new InvalidLifeThemeException('invalid-theme-value');

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Unknown life theme: invalid-theme-value');
  });
});
