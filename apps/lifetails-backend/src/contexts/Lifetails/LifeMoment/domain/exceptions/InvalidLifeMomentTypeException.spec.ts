import { InvalidLifeMomentTypeException } from './InvalidLifeMomentTypeException';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

describe('InvalidLifeMomentTypeException', () => {
  it('should create an instance of InvalidLifeMomentTypeException', () => {
    const exception = new InvalidLifeMomentTypeException(new StringValueObject('InvalidType'));

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Unknown life moment type: InvalidType');
  });
});
