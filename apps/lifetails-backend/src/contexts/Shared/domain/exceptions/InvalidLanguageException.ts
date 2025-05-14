export class InvalidLanguageException extends Error {
  constructor(language: string) {
    super(`The language <${language}> is not supported.`);
  }
}
