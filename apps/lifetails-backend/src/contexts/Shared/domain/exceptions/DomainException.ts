export abstract class DomainException extends Error {
  abstract readonly reason: string;

  constructor(message: string) {
    super(message);
  }
}
