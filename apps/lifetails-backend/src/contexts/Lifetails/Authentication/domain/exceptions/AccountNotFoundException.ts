export class AccountNotFoundException extends Error {
  constructor() {
    super('Account not found');
    this.name = 'AccountNotFoundException';
  }
}
