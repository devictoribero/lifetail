import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMomentNotFoundException } from './LifeMomentNotFoundException';

describe('LifeMomentNotFoundException', () => {
  it('should create an instance of LifeMomentNotFoundException', () => {
    const exception = new LifeMomentNotFoundException();

    expect(exception).toBeInstanceOf(LifeMomentNotFoundException);
    expect(exception.name).toBe('LifeMomentNotFoundException');
    expect(exception.code).toBe('LIFE_MOMENT_NOT_FOUND');
    expect(exception.message).toBe('Life moment not found');
  });
});
