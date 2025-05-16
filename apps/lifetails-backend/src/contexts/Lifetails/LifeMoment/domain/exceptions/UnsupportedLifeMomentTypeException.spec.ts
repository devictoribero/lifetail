import { UnsupportedLifeMomentTypeException } from './UnsupportedLifeMomentTypeException';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

describe('UnsupportedLifeMomentTypeException', () => {
  it('should create an instance of UnsupportedLifeMomentTypeException', () => {
    const exception = new UnsupportedLifeMomentTypeException(new StringValueObject('InvalidType'));

    expect(exception).toBeInstanceOf(UnsupportedLifeMomentTypeException);
    expect(exception.name).toBe('UnsupportedLifeMomentTypeException');
    expect(exception.reason).toBe('UNSUPPORTED_LIFE_MOMENT_TYPE');
    expect(exception.message).toBe('Unsupported life moment type: InvalidType');
  });
});
