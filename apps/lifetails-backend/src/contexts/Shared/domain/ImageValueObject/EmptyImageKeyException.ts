import { DomainException } from '../exceptions/DomainException';

export class EmptyImageKeyException extends DomainException {
  readonly code = 'EMPTY_IMAGE_KEY';

  constructor() {
    super('Image key cannot be empty');
    this.name = 'EmptyImageKeyException';
  }
}
