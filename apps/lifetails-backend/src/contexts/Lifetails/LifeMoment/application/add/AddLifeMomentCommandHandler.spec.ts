import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import { AddLifeMomentCommand } from './AddLifeMomentCommand';
import { LifeMomentInMemoryRepository } from '../../infrastructure/LifeMomentInMemoryRepository';
import { AddLifeMomentCommandHandler } from './AddLifeMomentCommandHandler';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { LifeMomentObjectMother } from '../../domain/entities/LifeMomentObjectMother.spec';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

describe('AddLifeMomentCommandHandler', () => {
  let repository: LifeMomentInMemoryRepository;
  let commandHandler: AddLifeMomentCommandHandler;

  beforeEach(() => {
    repository = new LifeMomentInMemoryRepository();
    commandHandler = new AddLifeMomentCommandHandler(repository);
  });

  it('should add a life moment', async () => {
    // Arrange
    const lifeMoment = LifeMomentObjectMother.create();
    const saveSpy = jest.spyOn(repository, 'save');
    const command = new AddLifeMomentCommand(
      lifeMoment.getId().toString(),
      lifeMoment.getType().toString(),
      lifeMoment.getPetId().toString(),
      lifeMoment.getCreatedBy().toString(),
      lifeMoment.getOccurredOn().toDate(),
      lifeMoment.getDescription().toString(),
    );

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledWith({
      id: expect.any(UUID),
      type: lifeMoment.getType(),
      petId: lifeMoment.getPetId(),
      createdBy: lifeMoment.getCreatedBy(),
      occurredOn: lifeMoment.getOccurredOn(),
      description: lifeMoment.getDescription(),
      theme: lifeMoment.getTheme(),
      createdAt: expect.any(DateValueObject),
      updatedAt: null,
      deletedAt: null,
      domainEvents: [],
    });
  });
});
