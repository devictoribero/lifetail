import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

export class InvalidLifeMomentTypeException extends Error {
  constructor(eventType: StringValueObject) {
    super(`Unknown life moment type: ${eventType.toString()}`);
    this.name = 'InvalidLifeMomentTypeException';
  }
}
