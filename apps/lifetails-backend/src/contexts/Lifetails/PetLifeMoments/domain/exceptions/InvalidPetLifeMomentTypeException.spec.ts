import { InvalidPetLifeMomentTypeException } from './InvalidPetLifeMomentTypeException';

describe('InvalidPetLifeMomentTypeException', () => {
  it('should create an instance of InvalidPetLifeMomentTypeException', () => {
    const exception = new InvalidPetLifeMomentTypeException('InvalidType');

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Unknown pet life moment type: InvalidType');
  });
});
