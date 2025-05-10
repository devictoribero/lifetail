export class InvalidLifeMomentTypeException extends Error {
  constructor(eventType: string) {
    super(`Unknown life moment type: ${eventType}`);
    this.name = 'InvalidLifeMomentTypeException';
  }
}
