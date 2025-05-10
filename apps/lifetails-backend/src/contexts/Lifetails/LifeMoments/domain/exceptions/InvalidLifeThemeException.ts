export class InvalidLifeThemeException extends Error {
  constructor(theme: string) {
    super(`Unknown life theme: ${theme}`);
    this.name = 'InvalidLifeThemeException';
  }
}
