import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEvent } from '../../domain/DomainEvent';
import { EventBus } from '../../domain/EventBus';

@Injectable()
export class NestEventBus implements EventBus {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async publish(events: DomainEvent[]): Promise<void> {
    const promises = events.map((event) =>
      this.eventEmitter.emit(event.eventName, event.toPrimitives()),
    );

    await Promise.all(promises);
  }
}
