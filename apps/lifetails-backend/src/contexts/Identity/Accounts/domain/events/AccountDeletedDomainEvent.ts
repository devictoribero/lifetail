import { DomainEvent } from 'src/contexts/Shared/domain/DomainEvent';

type AccountDeletedDomainEventAttributes = {
  readonly email: string;
};

export class AccountDeletedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'account.deleted';

  readonly email: string;

  constructor(attributes: {
    aggregateId: string;
    email: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: AccountDeletedDomainEvent.EVENT_NAME,
      aggregateId: attributes.aggregateId,
      eventId: attributes.eventId,
      occurredOn: attributes.occurredOn,
    });

    this.email = attributes.email;
  }

  toPrimitives(): AccountDeletedDomainEventAttributes {
    return {
      email: this.email,
    };
  }
}
