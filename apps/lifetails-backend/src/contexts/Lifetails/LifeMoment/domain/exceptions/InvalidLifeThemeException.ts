import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

export class InvalidLifeThemeException extends Error {
  constructor(theme: StringValueObject) {
    super(`Unknown life theme: ${theme.toString()}`);
    this.name = 'InvalidLifeThemeException';
  }
}
