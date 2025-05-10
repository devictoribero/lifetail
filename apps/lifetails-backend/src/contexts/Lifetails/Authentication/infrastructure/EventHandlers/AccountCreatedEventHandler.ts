import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AccountCreatedDomainEvent } from '../../domain/AccountCreatedDomainEvent';

@Injectable()
export class AccountCreatedEventHandler {
  private readonly logger = new Logger(AccountCreatedEventHandler.name);

  @OnEvent(AccountCreatedDomainEvent.EVENT_NAME)
  async handle(event: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
    attributes: { email: string };
  }): Promise<void> {
    console.log({ event });
    this.logger.log(
      `Account created with ID: ${event.aggregateId} and email: ${event.attributes.email}`,
    );
    // Here you would handle the event, such as sending a welcome email, etc.
  }
}
