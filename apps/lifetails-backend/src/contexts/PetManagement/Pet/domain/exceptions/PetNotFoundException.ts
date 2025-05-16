import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';

export class PetNotFoundException extends DomainException {
  readonly reason = 'PET_NOT_FOUND';

  constructor() {
    super(`Pet not found`);
    this.name = 'PetNotFoundException';
  }
}
