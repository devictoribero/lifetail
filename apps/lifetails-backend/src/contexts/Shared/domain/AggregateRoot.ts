import { DomainEvent } from './DomainEvent';

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[] = [];

  public abstract toPrimitives(): any;

  public record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public pullDomainEvents(): DomainEvent[] {
    const events = [...this.domainEvents];
    this.domainEvents = [];
    return events;
  }
}
