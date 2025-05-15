import { UUID } from './UUID';

export abstract class DomainEvent {
  static EVENT_NAME: string;
  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor({
    eventName,
    aggregateId,
    eventId = UUID.generate().toString(),
    occurredOn = new Date(),
  }: {
    eventName: string;
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    this.eventName = eventName;
    this.aggregateId = aggregateId;
    this.eventId = eventId;
    this.occurredOn = occurredOn;
  }

  abstract toPrimitives(): DomainEventAttributes;
}

type DomainEventAttributes = any;
