export class VeterinaryNameTooShortException extends Error {
  constructor() {
    super('Veterinary name must have at least 3 characters');
    this.name = 'VeterinaryNameTooShortException';
  }
}
