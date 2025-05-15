import { InvalidLanguageException } from './InvalidLanguageException';

describe('InvalidLanguageException', () => {
  it('should be defined', () => {
    expect(InvalidLanguageException).toBeDefined();
  });

  it('should be an instance of InvalidLanguageException', () => {
    const error = new InvalidLanguageException('invalid-language');

    expect(error).toBeInstanceOf(InvalidLanguageException);
    expect(error.message).toBe('The language <invalid-language> is not supported.');
  });
});
