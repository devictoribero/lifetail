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
import { LifeMomentObjectMother } from '../../domain/entities/LifeMomentObjectMother.spec';

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

    lifeMoment = LifeMoment.create({
      id,
      type: LifeMomentType.fromPrimitives(type),
      petId: new UUID(petId),
      createdBy: new UUID(createdBy),
      occurredOn: new DateValueObject(occurredOn),
      description: new StringValueObject(description),
    });

    await repository.save(lifeMoment);
  });

  it('should throw LifeMomentNotFoundException when moment does not exist', async () => {
    // Arrange
    const lifeMoment = LifeMomentObjectMother.create();
    repository.find = jest.fn().mockResolvedValue(null);
    const command = new UpdateLifeMomentCommand(
      lifeMoment.getId().toString(),
      lifeMoment.getDescription().toString(),
    );

    // Act & Assert
    await expect(commandHandler.handle(command)).rejects.toThrow(new LifeMomentNotFoundException());
  });

  it('should update description when provided', async () => {
    // Arrange
    const id = UUID.generate();
    const lifeMoment = LifeMomentObjectMother.createWith({ id });
    const newDescription = faker.lorem.sentence();
    const findSpy = jest.spyOn(repository, 'find');
    findSpy.mockResolvedValue(lifeMoment);
    const saveSpy = jest.spyOn(repository, 'save');
    const command = new UpdateLifeMomentCommand(lifeMoment.getId().toString(), newDescription);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(findSpy).toHaveBeenCalledWith(id);
    expect(saveSpy).toHaveBeenCalledWith({
      ...lifeMoment,
      description: new StringValueObject(newDescription),
    });
  });

  it('should update occurredOn date when provided', async () => {
    // Arrange
    const id = UUID.generate();
    const lifeMoment = LifeMomentObjectMother.createWith({ id });
    const newDate = faker.date.future();
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');
    findSpy.mockResolvedValue(lifeMoment);
    const command = new UpdateLifeMomentCommand(id.toString(), undefined, newDate);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(findSpy).toHaveBeenCalledWith(id);
    expect(saveSpy).toHaveBeenCalledWith({
      ...lifeMoment,
      occurredOn: new DateValueObject(newDate),
    });
  });

  it('should update multiple fields when provided', async () => {
    // Arrange
    const id = UUID.generate();
    const lifeMoment = LifeMomentObjectMother.createWith({ id });
    const newDescription = faker.lorem.sentence();
    const newDate = faker.date.future();
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');
    findSpy.mockResolvedValue(lifeMoment);
    const command = new UpdateLifeMomentCommand(id.toString(), newDescription, newDate);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(findSpy).toHaveBeenCalledWith(id);
    expect(saveSpy).toHaveBeenCalledWith({
      ...lifeMoment,
      description: new StringValueObject(newDescription),
      occurredOn: new DateValueObject(newDate),
    });
  });
});
