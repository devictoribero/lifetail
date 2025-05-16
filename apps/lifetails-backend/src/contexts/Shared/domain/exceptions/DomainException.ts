export abstract class DomainException extends Error {
  abstract readonly code: string;

  constructor(message: string) {
    super(message);
  }
}
