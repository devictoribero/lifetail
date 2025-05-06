import { MaxNumberOfPetsReachedException } from './MaxNumberOfPetsReachedException';

describe('MaxNumberOfPetsReachedException', () => {
  it('should create an instance of MaxNumberOfPetsReachedException', () => {
    const exception = new MaxNumberOfPetsReachedException();

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Max number of pets reached');
    expect(exception.name).toBe('MaxNumberOfPetsReachedException');
  });
});
