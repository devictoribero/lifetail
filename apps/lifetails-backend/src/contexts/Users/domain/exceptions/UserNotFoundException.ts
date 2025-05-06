export class UserNotFoundException extends Error {
  constructor(accountId: string) {
    super(`User of account ID ${accountId} not found`);
    this.name = 'UserNotFoundException';
  }
}
