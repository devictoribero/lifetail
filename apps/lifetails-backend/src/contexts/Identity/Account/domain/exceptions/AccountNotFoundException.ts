import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';

export class AccountNotFoundException extends DomainException {
  readonly code = 'ACCOUNT_NOT_FOUND';

  constructor() {
    super('Account not found');
    this.name = 'AccountNotFoundException';
  }
}
