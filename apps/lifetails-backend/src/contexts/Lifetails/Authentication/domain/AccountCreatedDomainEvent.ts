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

  public toPrimitives(): {
    aggregateId: string;
    occurredOn: Date;
    attributes: AccountCreatedDomainEventAttributes;
  } {
    const { email } = this;
    return {
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      attributes: { email },
    };
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
