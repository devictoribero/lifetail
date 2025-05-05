export class UserNotFoundException extends Error {
  constructor(accountId: string) {
    super(`User with account ID ${accountId} not found`);
    this.name = 'UserNotFoundException';
  }
}
