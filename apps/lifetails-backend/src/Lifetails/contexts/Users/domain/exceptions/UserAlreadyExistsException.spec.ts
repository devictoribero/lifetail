import { UserAlreadyExistsException } from './UserAlreadyExistsException';

describe('UserAlreadyExistsException', () => {
  it('should create an instance of UserAlreadyExistsException', () => {
    const accountId = '1';
    const exception = new UserAlreadyExistsException(accountId);

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe(`User of account ID ${accountId} already exists`);
  });
});
