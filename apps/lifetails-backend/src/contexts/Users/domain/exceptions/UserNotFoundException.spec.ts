import { UserNotFoundException } from './UserNotFoundException';

describe('UserNotFoundException', () => {
  it('should create an instance of UserNotFoundException', () => {
    const accountId = '1';
    const exception = new UserNotFoundException(accountId);

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe(`User of account ID ${accountId} not found`);
  });
});
