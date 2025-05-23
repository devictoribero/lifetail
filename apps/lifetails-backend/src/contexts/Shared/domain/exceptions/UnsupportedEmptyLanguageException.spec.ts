import { UnsupportedEmptyLanguageException } from './UnsupportedEmptyLanguageException';

describe('UnsupportedEmptyLanguageException', () => {
  it('should be an instance of UnsupportedEmptyLanguageException', () => {
    const error = new UnsupportedEmptyLanguageException();

    expect(error).toBeInstanceOf(UnsupportedEmptyLanguageException);
    expect(error.name).toBe('UnsupportedEmptyLanguageException');
    expect(error.code).toBe('UNSUPPORTED_EMPTY_LANGUAGE');
    expect(error.message).toBe('Unsupported empty language.');
  });
});
