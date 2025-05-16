import { AccountNotFoundException } from './AccountNotFoundException';

describe('AccountNotFoundException', () => {
  it('should be an instance of AccountNotFoundException', () => {
    const exception = new AccountNotFoundException();

    expect(exception).toBeInstanceOf(AccountNotFoundException);
    expect(exception.name).toBe('AccountNotFoundException');
    expect(exception.code).toBe('ACCOUNT_NOT_FOUND');
    expect(exception.message).toBe('Account not found');
  });
});
