import { UnsupportedLifeThemeException } from './UnsupportedLifeThemeException';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

describe('UnsupportedLifeThemeException', () => {
  it('should create an instance of UnsupportedLifeThemeException', () => {
    const exception = new UnsupportedLifeThemeException(
      new StringValueObject('invalid-theme-value'),
    );

    expect(exception).toBeInstanceOf(UnsupportedLifeThemeException);
    expect(exception.name).toBe('UnsupportedLifeThemeException');
    expect(exception.reason).toBe('UNSUPPORTED_LIFE_THEME');
    expect(exception.message).toBe('Unsupported life theme: invalid-theme-value');
  });
});
