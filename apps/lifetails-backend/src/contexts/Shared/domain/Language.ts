import { StringValueObject } from './StringValueObject';
import { InvalidLanguageException } from './exceptions/InvalidLanguageException';

export enum LanguageEnum {
  English = 'en',
  Spanish = 'es',
}

export class Language extends StringValueObject {
  static readonly English = new Language(LanguageEnum.English);
  static readonly Spanish = new Language(LanguageEnum.Spanish);
  private static readonly types = [Language.English, Language.Spanish];

  private constructor(value: string) {
    super(value);
  }

  // Use to create the entity from the domain
  public static create(value: string): Language {
    return new Language(value);
  }

  // Use to reconstruct the entity from the database
  public static fromPrimitives(value: string): Language {
    const language = new Language(value);
    const validLanguage = Language.types.find((lang) => lang.equals(language));

    if (!validLanguage) {
      throw new InvalidLanguageException(value);
    }

    return validLanguage;
  }
}
