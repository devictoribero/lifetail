export class EmailAlreadyInUseException extends Error {
  constructor() {
    super('Email is already in use');
    this.name = 'EmailAlreadyInUseException';
  }
}
