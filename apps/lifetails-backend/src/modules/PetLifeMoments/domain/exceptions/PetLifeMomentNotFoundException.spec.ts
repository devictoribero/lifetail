import { PetLifeMomentNotFoundException } from './PetLifeMomentNotFoundException';

describe('PetLifeMomentNotFoundException', () => {
  it('should create an instance of PetLifeMomentNotFoundException', () => {
    const exception = new PetLifeMomentNotFoundException('123');
    expect(exception).toBeInstanceOf(Error);
  });
});
