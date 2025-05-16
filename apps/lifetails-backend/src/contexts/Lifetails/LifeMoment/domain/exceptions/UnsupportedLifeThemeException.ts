import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

export class UnsupportedLifeThemeException extends DomainException {
  readonly code = 'UNSUPPORTED_LIFE_THEME';

  constructor(theme: StringValueObject) {
    super(`Unsupported life theme: ${theme.toString()}`);
    this.name = 'UnsupportedLifeThemeException';
  }
}
