import { PetNotFoundException } from './PetNotFoundException';

describe('PetNotFoundException', () => {
  it('should create an instance of PetNotFoundException', () => {
    const exception = new PetNotFoundException();

    expect(exception).toBeInstanceOf(PetNotFoundException);
    expect(exception.code).toBe('PET_NOT_FOUND');
    expect(exception.message).toBe('Pet not found');
  });
});
