import { LifeMomentNotFoundException } from './LifeMomentNotFoundException';

describe('LifeMomentNotFoundException', () => {
  it('should create an instance of LifeMomentNotFoundException', () => {
    const exception = new LifeMomentNotFoundException('123');

    expect(exception).toBeInstanceOf(Error);
    expect(exception.message).toBe('Life moment not found: 123');
  });
});
