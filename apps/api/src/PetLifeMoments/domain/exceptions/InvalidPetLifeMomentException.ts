export class InvalidPetLifeMomentException extends Error {
  constructor(eventType: string) {
    super(`Unknown pet life moment type: ${eventType}`);
    this.name = 'InvalidPetLifeMomentException';
  }
}
