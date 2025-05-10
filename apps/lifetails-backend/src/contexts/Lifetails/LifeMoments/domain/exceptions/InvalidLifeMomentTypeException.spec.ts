import { InvalidLifeMomentTypeException } from './InvalidLifeMomentTypeException';

describe('InvalidLifeMomentTypeException', () => {
  it('should create an instance of InvalidLifeMomentTypeException', () => {
    const exception = new InvalidLifeMomentTypeException('InvalidType');

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Unknown life moment type: InvalidType');
  });
});
