import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';

export class MaxNumberOfPetsReachedException extends DomainException {
  readonly code = 'MAX_NUMBER_OF_PETS_REACHED';

  constructor() {
    super(`Max number of pets reached`);
    this.name = 'MaxNumberOfPetsReachedException';
  }
}
