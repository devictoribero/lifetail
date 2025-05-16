import { DomainException } from 'src/contexts/Shared/domain/exceptions/DomainException';

export class UserAlreadyExistsException extends DomainException {
  readonly reason = 'USER_ALREADY_EXISTS';

  constructor() {
    super('User already exists');
    this.name = 'UserAlreadyExistsException';
  }
}
