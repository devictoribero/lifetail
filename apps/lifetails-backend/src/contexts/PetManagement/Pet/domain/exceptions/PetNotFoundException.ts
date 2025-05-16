import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';

export class PetNotFoundException extends DomainException {
  readonly code = 'PET_NOT_FOUND';

  constructor() {
    super(`Pet not found`);
    this.name = 'PetNotFoundException';
  }
}
