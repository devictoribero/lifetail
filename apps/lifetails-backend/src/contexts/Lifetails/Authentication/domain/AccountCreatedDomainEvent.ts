import { DomainEvent } from 'src/contexts/Lifetails/Shared/domain/DomainEvent';

type AccountCreatedDomainEventAttributes = {
  readonly email: string;
};

export class AccountCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'account.created';

  readonly email: string;

  public constructor({ aggregateId, email }: { aggregateId: string; email: string }) {
    super({ eventName: AccountCreatedDomainEvent.EVENT_NAME, aggregateId });
    this.email = email;
  }

  public toPrimitives(): AccountCreatedDomainEventAttributes {
    const { email, aggregateId } = this;
    return { email };
  }

  public static fromPrimitives({
    aggregateId,
    attributes,
  }: {
    aggregateId: string;
    attributes: AccountCreatedDomainEventAttributes;
  }): DomainEvent {
    return new AccountCreatedDomainEvent({ aggregateId, email: attributes.email });
  }
}
