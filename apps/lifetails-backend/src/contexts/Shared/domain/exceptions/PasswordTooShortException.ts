export class PasswordTooShortException extends Error {
  constructor(password: string) {
    super(`The password <${password}> is too short.`);
    this.name = 'PasswordTooShortException';
  }
}
