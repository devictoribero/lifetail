import { Language } from './Language';
import { InvalidLanguageException } from './exceptions/InvalidLanguageException';

const SUPPORTED_LANGUAGES = [
  { name: 'English', constant: Language.English, code: 'en' },
  { name: 'Spanish', constant: Language.Spanish, code: 'es' },
];

describe('Language', () => {
  SUPPORTED_LANGUAGES.forEach((language) => {
    describe(`${language.name} language`, () => {
      it('should throw an InvalidLanguageException when creating from invalid code', () => {
        expect(() => {
          Language.fromPrimitives('invalid-language');
        }).toThrow(InvalidLanguageException);
      });

      it(`should define ${language.name} with code "${language.code}"`, () => {
        expect(language.constant.toString()).toBe(language.code);
      });

      it(`should create ${language.name} language using code "${language.code}" with create method`, () => {
        const created = Language.create(language.code);

        expect(created.equals(language.constant)).toBeTruthy();
      });

      it(`should reconstruct ${language.name} language from code "${language.code}" with fromPrimitives method`, () => {
        const reconstructed = Language.fromPrimitives(language.code);

        expect(reconstructed).toBe(language.constant);
      });
    });
  });
});
