import { VeterinaryNotFoundException } from './VeterinaryNotFoundException';

describe('VeterinaryNotFoundException', () => {
  it('should create an instance of VeterinaryNotFoundException', () => {
    const exception = new VeterinaryNotFoundException();

    expect(exception).toBeInstanceOf(VeterinaryNotFoundException);
    expect(exception.code).toBe('VETERINARY_NOT_FOUND');
    expect(exception.message).toBe('Veterinary not found');
  });
});
