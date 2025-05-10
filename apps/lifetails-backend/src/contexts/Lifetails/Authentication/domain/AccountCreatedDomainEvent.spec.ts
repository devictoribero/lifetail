import { faker } from '@faker-js/faker';
import { AccountCreatedDomainEvent } from './AccountCreatedDomainEvent';

describe('AccountCreatedDomainEvent', () => {
  it('should create an instance of AccountCreatedDomainEvent', () => {
    const aggregateId = faker.string.uuid();
    const email = faker.internet.email();
    const event = new AccountCreatedDomainEvent({ aggregateId, email });

    expect(event).toBeInstanceOf(AccountCreatedDomainEvent);
    expect(event.aggregateId).toBe(aggregateId);
    expect(event.email).toBe(email);
    expect(event.eventName).toBe(AccountCreatedDomainEvent.EVENT_NAME);
    expect(event.eventId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(event.occurredOn).toBeInstanceOf(Date);
  });
});
