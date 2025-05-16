import { MaxNumberOfPetsReachedException } from './MaxNumberOfPetsReachedException';

describe('MaxNumberOfPetsReachedException', () => {
  it('should create an instance of MaxNumberOfPetsReachedException', () => {
    const exception = new MaxNumberOfPetsReachedException();

    expect(exception).toBeInstanceOf(MaxNumberOfPetsReachedException);
    expect(exception.reason).toBe('MAX_NUMBER_OF_PETS_REACHED');
    expect(exception.message).toBe('Max number of pets reached');
    expect(exception.name).toBe('MaxNumberOfPetsReachedException');
  });
});
