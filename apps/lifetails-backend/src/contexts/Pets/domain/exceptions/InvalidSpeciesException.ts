export class InvalidPetSpeciesException extends Error {
  constructor(value: string) {
    super(`Invalid pet species: ${value}`);
    this.name = 'InvalidPetSpeciesException';
  }
}
