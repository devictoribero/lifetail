import { UserNotFoundException } from './UserNotFoundException';

describe('UserNotFoundException', () => {
  it('should create an instance of UserNotFoundException', () => {
    const exception = new UserNotFoundException();

    expect(exception).toBeInstanceOf(UserNotFoundException);
    expect(exception.name).toBe('UserNotFoundException');
    expect(exception.code).toBe('USER_NOT_FOUND');
    expect(exception.message).toBe('User not found');
  });
});
