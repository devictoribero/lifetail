import { LifeMomentInMemoryRepository } from '../../infrastructure/LifeMomentInMemoryRepository';
import { RemoveLifeMomentCommandHandler } from './RemoveLifeMomentCommandHandler';
import { RemoveLifeMomentCommand } from './RemoveLifeMomentCommand';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { randomUUID } from 'node:crypto';
import { LifeMomentType } from '../../domain/entities/LifeMomentType';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { LifeMomentNotFoundException } from '../../domain/exceptions/LifeMomentNotFoundException';
import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';

describe('RemoveLifeMomentCommandHandler', () => {
  let repository: LifeMomentInMemoryRepository;
  let commandHandler: RemoveLifeMomentCommandHandler;

  beforeEach(() => {
    repository = new LifeMomentInMemoryRepository();
    commandHandler = new RemoveLifeMomentCommandHandler(repository);
  });

  it('should throw a LifeMomentNotFoundException when the life moment does not exist', async () => {
    // Arrange
    const nonExistentId = randomUUID();
    const command = new RemoveLifeMomentCommand(nonExistentId);

    await expect(commandHandler.handle(command)).rejects.toThrow(LifeMomentNotFoundException);
  });

  it('should remove a life moment', async () => {
    // Arrange
    const id = randomUUID();
    const type = 'VeterinaryVisit';
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = faker.date.recent();
    const description = 'Annual checkup, all looking good';
    // Create and save a life moment
    const lifeMoment = LifeMoment.create({
      id: new UUID(id),
      type: LifeMomentType.fromPrimitives(type),
      petId: new UUID(petId),
      createdBy: new UUID(createdBy),
      occurredOn: new DateValueObject(occurredOn),
      description: new StringValueObject(description),
    });
    await repository.save(lifeMoment);
    // Verify the life moment exists before removal
    const lifeMomentId = new UUID(id);
    const beforeRemoval = await repository.find(lifeMomentId);
    expect(beforeRemoval).not.toBeNull();
    const removeSpy = jest.spyOn(repository, 'remove');
    const command = new RemoveLifeMomentCommand(lifeMomentId.toString());

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledWith(lifeMomentId);
    // Verify the life moment no longer exists
    const afterRemoval = await repository.find(lifeMomentId);
    expect(afterRemoval).toBeNull();
  });
});
