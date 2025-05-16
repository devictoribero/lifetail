import { VeterinaryNameTooShortException } from './VeterinaryNameTooShortException';

describe('VeterinaryNameTooShortException', () => {
  it('should create an instance of VeterinaryNameTooShortException', () => {
    const exception = new VeterinaryNameTooShortException();

    expect(exception).toBeInstanceOf(VeterinaryNameTooShortException);
    expect(exception.name).toBe('VeterinaryNameTooShortException');
    expect(exception.reason).toBe('VETERINARY_NAME_TOO_SHORT');
    expect(exception.message).toBe('Veterinary name must have at least 3 characters');
  });
});
