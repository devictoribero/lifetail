import { InvalidLifeThemeException } from './InvalidLifeThemeException';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

describe('InvalidLifeThemeException', () => {
  it('should create an instance of InvalidLifeThemeException', () => {
    const exception = new InvalidLifeThemeException(new StringValueObject('invalid-theme-value'));

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Unknown life theme: invalid-theme-value');
  });
});
