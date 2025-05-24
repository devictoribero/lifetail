import { LifeMomentInMemoryRepository } from '../../infrastructure/LifeMomentInMemoryRepository';
import { RemoveLifeMomentCommandHandler } from './RemoveLifeMomentCommandHandler';
import { RemoveLifeMomentCommand } from './RemoveLifeMomentCommand';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { LifeMomentNotFoundException } from '../../domain/exceptions/LifeMomentNotFoundException';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMomentObjectMother } from '../../domain/entities/LifeMomentObjectMother.spec';

describe('RemoveLifeMomentCommandHandler', () => {
  let repository: LifeMomentInMemoryRepository;
  let commandHandler: RemoveLifeMomentCommandHandler;

  beforeEach(() => {
    repository = new LifeMomentInMemoryRepository();
    commandHandler = new RemoveLifeMomentCommandHandler(repository);
  });

  it('should throw a LifeMomentNotFoundException when the life moment does not exist', async () => {
    // Arrange
    repository.find = jest.fn().mockResolvedValue(null);
    const command = new RemoveLifeMomentCommand(UUID.generate().toString());

    await expect(commandHandler.handle(command)).rejects.toThrow(LifeMomentNotFoundException);
  });

  it('should remove a life moment', async () => {
    // Arrange
    const lifeMoment = LifeMomentObjectMother.create();
    repository.find = jest.fn().mockResolvedValue(lifeMoment);
    const lifeMomentIdToFind = lifeMoment.getId().toString();
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');
    const command = new RemoveLifeMomentCommand(lifeMomentIdToFind);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(findSpy).toHaveBeenCalledWith(lifeMoment.getId());
    expect(repository.save).toHaveBeenCalledWith({
      id: lifeMoment.getId(),
      type: lifeMoment.getType(),
      petId: lifeMoment.getPetId(),
      createdBy: lifeMoment.getCreatedBy(),
      occurredOn: lifeMoment.getOccurredOn(),
      description: lifeMoment.getDescription(),
      theme: lifeMoment.getTheme(),
      createdAt: lifeMoment.getCreatedAt(),
      updatedAt: expect.any(DateValueObject),
      deletedAt: expect.any(DateValueObject),
      domainEvents: [],
    });
  });
});
