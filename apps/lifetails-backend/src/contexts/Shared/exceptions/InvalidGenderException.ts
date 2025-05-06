export class InvalidGenderException extends Error {
  constructor(value: string) {
    super(`Invalid gender: ${value}`);
    this.name = 'InvalidGenderException';
  }
}
