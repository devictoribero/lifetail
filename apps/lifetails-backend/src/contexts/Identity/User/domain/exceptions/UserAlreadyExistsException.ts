export class UserAlreadyExistsException extends Error {
  constructor(accountId: string) {
    super(`User of account ID ${accountId} already exists`);
    this.name = 'UserAlreadyExistsException';
  }
}
