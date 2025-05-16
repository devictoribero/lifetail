import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

export class UnsupportedLifeMomentTypeException extends DomainException {
  readonly code = 'UNSUPPORTED_LIFE_MOMENT_TYPE';

  constructor(lifeMomentType: StringValueObject) {
    super(`Unsupported life moment type: ${lifeMomentType.toString()}`);
    this.name = 'UnsupportedLifeMomentTypeException';
  }
}
