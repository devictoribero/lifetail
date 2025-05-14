import { LifeMomentInMemoryRepository } from '../../infrastructure/LifeMomentInMemoryRepository';
import { UpdateLifeMomentCommandHandler } from './UpdateLifeMomentCommandHandler';
import { UpdateLifeMomentCommand } from './UpdateLifeMomentCommand';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { LifeMomentNotFoundException } from '../../domain/exceptions/LifeMomentNotFoundException';
import { LifeMomentType } from '../../domain/entities/LifeMomentType';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { UUID } from 'src/contexts/Shared/domain/UUID';

describe('UpdateLifeMomentCommandHandler', () => {
  let repository: LifeMomentInMemoryRepository;
  let commandHandler: UpdateLifeMomentCommandHandler;
  let id: UUID;
  let lifeMoment: LifeMoment;

  beforeEach(async () => {
    repository = new LifeMomentInMemoryRepository();
    commandHandler = new UpdateLifeMomentCommandHandler(repository);

    // Create a test life moment
    id = new UUID(faker.string.uuid());
    const type = 'VeterinaryVisit';
    const petId = faker.string.uuid();
    const createdBy = faker.string.uuid();
    const occurredOn = faker.date.recent();
    const description = faker.lorem.sentence();

    lifeMoment = LifeMoment.create(
      id,
      LifeMomentType.fromPrimitives(type),
      new UUID(petId),
      new UUID(createdBy),
      new DateValueObject(occurredOn),
      new StringValueObject(description),
    );

    await repository.save(lifeMoment);
  });

  it('should throw LifeMomentNotFoundException when moment does not exist', async () => {
    // Arrange
    const nonExistentId = faker.string.uuid();
    const command = new UpdateLifeMomentCommand(nonExistentId, faker.lorem.sentence());

    // Act & Assert
    await expect(commandHandler.handle(command)).rejects.toThrow(
      new LifeMomentNotFoundException(nonExistentId),
    );
  });

  it('should update description when provided', async () => {
    // Arrange
    const newDescription = faker.lorem.sentence();
    const saveSpy = jest.spyOn(repository, 'save');
    const command = new UpdateLifeMomentCommand(id.toString(), newDescription);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);

    const updatedMoment = await repository.find(id);
    expect(updatedMoment).not.toBeNull();
    expect(updatedMoment?.getDescription().toString()).toBe(newDescription);
  });

  it('should update occurredOn date when provided', async () => {
    // Arrange
    const newDate = faker.date.future();
    const saveSpy = jest.spyOn(repository, 'save');
    const command = new UpdateLifeMomentCommand(id.toString(), undefined, newDate);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);

    const updatedMoment = await repository.find(id);
    expect(updatedMoment).not.toBeNull();
    expect(updatedMoment?.getOccurredOn().toISOString()).toBe(
      new DateValueObject(newDate).toISOString(),
    );
  });

  it('should update multiple fields when provided', async () => {
    // Arrange
    const newDescription = faker.lorem.sentence();
    const newDate = faker.date.future();
    const saveSpy = jest.spyOn(repository, 'save');
    const command = new UpdateLifeMomentCommand(id.toString(), newDescription, newDate);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);

    const updatedMoment = await repository.find(id);
    expect(updatedMoment).not.toBeNull();
    expect(updatedMoment?.getDescription().toString()).toBe(newDescription);
    expect(updatedMoment?.getOccurredOn().toISOString()).toBe(
      new DateValueObject(newDate).toISOString(),
    );
    expect(updatedMoment?.getPetId()).toEqual(lifeMoment.getPetId());
  });
});
