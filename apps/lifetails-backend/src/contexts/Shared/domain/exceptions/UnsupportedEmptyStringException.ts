export class UnsupportedEmptyStringException extends Error {
  constructor() {
    super('Unsupported empty string');
    this.name = 'UnsupportedEmptyStringException';
  }
}
