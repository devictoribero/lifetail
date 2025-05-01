export class InvalidPetGenderException extends Error {
  constructor(value: string) {
    super(`Invalid pet gender: ${value}`);
    this.name = 'InvalidPetGenderException';
  }
}
