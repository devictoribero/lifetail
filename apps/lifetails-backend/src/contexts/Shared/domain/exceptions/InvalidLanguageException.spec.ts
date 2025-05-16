import { InvalidLanguageException } from './InvalidLanguageException';

describe('InvalidLanguageException', () => {
  it('should be an instance of InvalidLanguageException', () => {
    const error = new InvalidLanguageException('invalid-language');

    expect(error).toBeInstanceOf(InvalidLanguageException);
    expect(error.name).toBe('InvalidLanguageException');
    expect(error.code).toBe('INVALID_LANGUAGE');
    expect(error.message).toBe('invalid-language is not a valid language.');
  });
});
