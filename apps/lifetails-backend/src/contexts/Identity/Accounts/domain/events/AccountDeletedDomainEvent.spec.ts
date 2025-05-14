import { faker } from '@faker-js/faker';
import { AccountDeletedDomainEvent } from './AccountDeletedDomainEvent';

describe('AccountDeletedDomainEvent', () => {
  it('should create an instance of AccountDeletedDomainEvent', () => {
    const aggregateId = faker.string.uuid();
    const email = faker.internet.email();
    const event = new AccountDeletedDomainEvent({ aggregateId, email });

    expect(event).toBeInstanceOf(AccountDeletedDomainEvent);
    expect(event.aggregateId).toBe(aggregateId);
    expect(event.email).toBe(email);
    expect(event.eventName).toBe(AccountDeletedDomainEvent.EVENT_NAME);
    expect(event.eventId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(event.occurredOn).toBeInstanceOf(Date);
  });
});
