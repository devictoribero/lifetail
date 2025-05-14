export class InvalidGenderException extends Error {
  constructor(gender: string) {
    super(`The gender <${gender}> is invalid.`);
  }
}
