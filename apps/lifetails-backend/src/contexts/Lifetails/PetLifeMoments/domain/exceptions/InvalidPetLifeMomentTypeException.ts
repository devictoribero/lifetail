export class InvalidPetLifeMomentTypeException extends Error {
  constructor(eventType: string) {
    super(`Unknown pet life moment type: ${eventType}`);
    this.name = 'InvalidPetLifeMomentTypeException';
  }
}
