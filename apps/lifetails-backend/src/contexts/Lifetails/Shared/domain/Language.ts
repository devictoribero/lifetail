import { StringValueObject } from './StringValueObject';
import { InvalidLanguageException } from './exceptions/InvalidLanguageException';

export enum LanguageCode {
  English = 'en',
  Spanish = 'es',
}

export class Language extends StringValueObject {
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
    const validLanguage = Language.all.find((lang) => lang.equals(language));

    if (!validLanguage) {
      throw new InvalidLanguageException(value);
    }

    return validLanguage;
  }

  public static readonly English = new Language(LanguageCode.English);
  public static readonly Spanish = new Language(LanguageCode.Spanish);
  public static readonly all = [Language.English, Language.Spanish];
}
