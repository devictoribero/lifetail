import { faker } from '@faker-js/faker';
import { PetAddedDomainEvent } from './PetAddedDomainEvent';

describe('PetAddedDomainEvent', () => {
  it('should create an instance of PetAddedDomainEvent', () => {
    const aggregateId = faker.string.uuid();
    const name = faker.animal.dog();
    const event = new PetAddedDomainEvent({ aggregateId, name });

    expect(event).toBeInstanceOf(PetAddedDomainEvent);
    expect(event.aggregateId).toBe(aggregateId);
    expect(event.name).toBe(name);
    expect(event.eventName).toBe(PetAddedDomainEvent.EVENT_NAME);
    expect(event.eventId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    expect(event.occurredOn).toBeInstanceOf(Date);
  });
});
