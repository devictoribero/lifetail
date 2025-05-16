import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

export class UnsupportedPetSpeciesException extends DomainException {
  readonly code = 'UNSUPPORTED_PET_SPECIES';

  constructor(value: StringValueObject) {
    super(`Unsupported pet species: ${value.toString()}`);
    this.name = 'UnsupportedPetSpeciesException';
  }
}
