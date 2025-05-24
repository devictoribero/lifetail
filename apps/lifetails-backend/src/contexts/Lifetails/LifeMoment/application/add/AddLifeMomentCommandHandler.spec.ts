import { AddLifeMomentCommand } from './AddLifeMomentCommand';
import { AddLifeMomentCommandHandler } from './AddLifeMomentCommandHandler';
import { LifeMomentObjectMother } from '../../domain/entities/LifeMomentObjectMother.spec';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';

describe('AddLifeMomentCommandHandler', () => {
  let repository: jest.Mocked<LifeMomentRepository>;
  let commandHandler: AddLifeMomentCommandHandler;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
      search: jest.fn(),
    } as jest.Mocked<LifeMomentRepository>;
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
