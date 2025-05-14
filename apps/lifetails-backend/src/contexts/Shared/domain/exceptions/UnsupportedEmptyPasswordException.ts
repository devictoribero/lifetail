export class UnsupportedEmptyPasswordException extends Error {
  constructor() {
    super(`Unsupported empty password.`);
    this.name = 'UnsupportedEmptyPasswordException';
  }
}
