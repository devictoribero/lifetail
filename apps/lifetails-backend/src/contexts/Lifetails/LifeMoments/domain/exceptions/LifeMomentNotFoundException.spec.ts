import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMomentNotFoundException } from './LifeMomentNotFoundException';

describe('LifeMomentNotFoundException', () => {
  it('should create an instance of LifeMomentNotFoundException', () => {
    const id = UUID.generate();
    const exception = new LifeMomentNotFoundException(id);

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe(`Life moment not found: ${id.toString()}`);
  });
});
