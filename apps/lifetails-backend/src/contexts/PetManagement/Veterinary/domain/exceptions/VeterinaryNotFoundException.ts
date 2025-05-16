import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';

export class VeterinaryNotFoundException extends DomainException {
  readonly reason = 'VETERINARY_NOT_FOUND';

  constructor() {
    super(`Veterinary not found`);
    this.name = 'VeterinaryNotFoundException';
  }
}
