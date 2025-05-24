import { DomainException } from '../exceptions/DomainException';

export class InvalidImageUploadDateException extends DomainException {
  readonly code = 'INVALID_IMAGE_UPLOAD_DATE';

  constructor(date: Date) {
    const dateString = isNaN(date.getTime()) ? 'Invalid Date' : date.toISOString();
    super(`Invalid image upload date: ${dateString}`);
    this.name = 'InvalidImageUploadDateException';
  }
}
