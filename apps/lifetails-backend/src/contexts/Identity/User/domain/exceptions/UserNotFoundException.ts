import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';

export class UserNotFoundException extends DomainException {
  readonly code = 'USER_NOT_FOUND';

  constructor() {
    super('User not found');
    this.name = 'UserNotFoundException';
  }
}
