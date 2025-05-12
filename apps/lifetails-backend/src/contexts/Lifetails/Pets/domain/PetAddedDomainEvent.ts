import { DomainEvent } from 'src/contexts/Lifetails/Shared/domain/DomainEvent';

type PetAddedDomainEventAttributes = {
  readonly name: string;
};

export class PetAddedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'pet.added';

  readonly name: string;

  public constructor({ aggregateId, name }: { aggregateId: string; name: string }) {
    super({ eventName: PetAddedDomainEvent.EVENT_NAME, aggregateId });
    this.name = name;
  }

  public toPrimitives(): {
    aggregateId: string;
    occurredOn: Date;
    attributes: PetAddedDomainEventAttributes;
  } {
    const { name } = this;
    return {
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      attributes: { name },
    };
  }
}
