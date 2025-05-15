import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

export class InvalidPetSpeciesException extends Error {
  constructor(value: StringValueObject) {
    super(`Invalid pet species: ${value.toString()}`);
    this.name = 'InvalidPetSpeciesException';
  }
}
