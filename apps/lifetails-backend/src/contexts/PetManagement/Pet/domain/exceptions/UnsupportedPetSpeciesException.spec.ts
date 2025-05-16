import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

import { UnsupportedPetSpeciesException } from './UnsupportedPetSpeciesException';

describe('UnsupportedPetSpeciesException', () => {
  it('should create an instance of UnsupportedPetSpeciesException', () => {
    const exception = new UnsupportedPetSpeciesException(new StringValueObject('InvalidSpecies'));

    expect(exception).toBeInstanceOf(UnsupportedPetSpeciesException);
    expect(exception.reason).toBe('UNSUPPORTED_PET_SPECIES');
    expect(exception.message).toBe('Unsupported pet species: InvalidSpecies');
  });
});
