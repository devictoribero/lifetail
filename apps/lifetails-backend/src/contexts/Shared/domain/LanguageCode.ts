import { StringValueObject } from './StringValueObject';
import { InvalidLanguageException } from './exceptions/InvalidLanguageException';

export enum LanguageCodeEnum {
  English = 'EN',
  Spanish = 'ES',
}

export class LanguageCode extends StringValueObject {
  static readonly English = new LanguageCode(LanguageCodeEnum.English);
  static readonly Spanish = new LanguageCode(LanguageCodeEnum.Spanish);
  private static readonly types = [LanguageCode.English, LanguageCode.Spanish];

  private constructor(value: string) {
    super(value);
  }

  // Use to create the entity from the domain
  public static create(value: string): LanguageCode {
    return new LanguageCode(value);
  }

  // Use to reconstruct the entity from the database
  public static fromPrimitives(value: string): LanguageCode {
    const language = new LanguageCode(value);
    const validLanguage = LanguageCode.types.find((lang) => lang.equals(language));

    if (!validLanguage) {
      throw new InvalidLanguageException(value);
    }

    return validLanguage;
  }
}
