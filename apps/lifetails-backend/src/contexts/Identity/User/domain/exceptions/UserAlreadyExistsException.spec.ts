import { UserAlreadyExistsException } from './UserAlreadyExistsException';

describe('UserAlreadyExistsException', () => {
  it('should create an instance of UserAlreadyExistsException', () => {
    const exception = new UserAlreadyExistsException();

    expect(exception).toBeInstanceOf(UserAlreadyExistsException);
    expect(exception.name).toBe('UserAlreadyExistsException');
    expect(exception.code).toBe('USER_ALREADY_EXISTS');
    expect(exception.message).toBe('User already exists');
  });
});
