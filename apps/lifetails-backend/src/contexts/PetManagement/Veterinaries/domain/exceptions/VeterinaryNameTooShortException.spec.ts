import { VeterinaryNameTooShortException } from './VeterinaryNameTooShortException';

describe('VeterinaryNameTooShortException', () => {
  it('should be defined', () => {
    expect(VeterinaryNameTooShortException).toBeDefined();
  });

  it('should have the correct error message', () => {
    const exception = new VeterinaryNameTooShortException();

    expect(exception.name).toBe('VeterinaryNameTooShortException');
    expect(exception.message).toBe('Veterinary name must have at least 3 characters');
  });
});
