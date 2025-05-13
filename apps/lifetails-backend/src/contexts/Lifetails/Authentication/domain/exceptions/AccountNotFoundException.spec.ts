import { AccountNotFoundException } from './AccountNotFoundException';

describe('AccountNotFoundException', () => {
  it('should be an instance of Error', () => {
    const exception = new AccountNotFoundException();
    expect(exception).toBeInstanceOf(Error);
  });

  it('should have the correct error message', () => {
    const exception = new AccountNotFoundException();
    expect(exception.message).toBe('Account not found');
  });

  it('should have the correct name', () => {
    const exception = new AccountNotFoundException();
    expect(exception.name).toBe('AccountNotFoundException');
  });
});
