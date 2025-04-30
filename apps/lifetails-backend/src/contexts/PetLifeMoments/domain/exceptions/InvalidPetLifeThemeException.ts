export class InvalidPetLifeThemeException extends Error {
  constructor(theme: string) {
    super(`Unknown pet life theme: ${theme}`);
    this.name = 'InvalidPetLifeThemeException';
  }
}
