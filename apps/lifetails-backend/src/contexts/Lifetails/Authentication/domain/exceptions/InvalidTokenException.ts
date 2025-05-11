export class InvalidTokenException extends Error {
  constructor() {
    super('Invalid token');
    this.name = 'InvalidTokenException';
  }
}
