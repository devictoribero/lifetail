import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import { AddLifeMomentCommand } from './AddLifeMomentCommand';
import { LifeMomentInMemoryRepository } from '../../infrastructure/LifeMomentInMemoryRepository';
import { AddLifeMomentCommandHandler } from './AddLifeMomentCommandHandler';
import { LifeMoment } from '../../domain/entities/LifeMoment';

describe('AddLifeMomentCommandHandler', () => {
  let repository: LifeMomentInMemoryRepository;
  let commandHandler: AddLifeMomentCommandHandler;

  beforeEach(() => {
    repository = new LifeMomentInMemoryRepository();
    commandHandler = new AddLifeMomentCommandHandler(repository);
  });

  it('should add a life moment', async () => {
    // Arrange
    const saveSpy = jest.spyOn(repository, 'save');
    const id = randomUUID();
    const type = 'VeterinaryVisit';
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = faker.date.recent();
    const description = 'Annual checkup, all looking good';

    // Act
    const command = new AddLifeMomentCommand(id, type, petId, createdBy, occurredOn, description);
    await commandHandler.handle(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);
    const savedMoment = saveSpy.mock.calls[0][0] as unknown as LifeMoment;
    expect(savedMoment.getId().toString()).toBe(id);
    expect(savedMoment.getType().toString()).toBe(type);
    expect(savedMoment.getTheme().toString()).toBe('Wellness');
    expect(savedMoment.getPetId().toString()).toBe(petId);
    expect(savedMoment.getCreatedBy().toString()).toBe(createdBy);
    expect(savedMoment.getOccurredOn().toISOString()).toBe(occurredOn.toISOString());
  });
});
