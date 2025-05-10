import { LifeMomentInMemoryRepository } from '../../infrastructure/LifeMomentInMemoryRepository';
import { FindLifeMomentQueryHandler } from './FindLifeMomentQueryHandler';
import { FindLifeMomentQuery } from './FindLifeMomentQuery';
import { LifeMoment } from '../../domain/entities/LifeMoment';
import { LifeMomentNotFoundException } from '../../domain/exceptions/LifeMomentNotFoundException';
import { LifeMomentType } from '../../domain/entities/LifeMomentType';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';
import { LifeMomentRepository } from '../../domain/repositories/LifeMomentRepository';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';

describe('FindLifeMomentQueryHandler', () => {
  let repository: LifeMomentInMemoryRepository;
  let queryHandler: FindLifeMomentQueryHandler;

  beforeEach(() => {
    repository = new LifeMomentInMemoryRepository();
    queryHandler = new FindLifeMomentQueryHandler(repository as unknown as LifeMomentRepository);
  });

  it('should throw LifeMomentNotFoundException when life moment does not exist', async () => {
    // Arrange
    const nonExistentId = faker.string.uuid();
    const query = new FindLifeMomentQuery(nonExistentId);

    // Act & Assert
    await expect(queryHandler.execute(query)).rejects.toThrow(
      new LifeMomentNotFoundException(nonExistentId),
    );
  });

  it('should find a life moment', async () => {
    // Arrange
    const id = faker.string.uuid();
    const type = 'VeterinaryVisit';
    const petId = faker.string.uuid();
    const createdBy = faker.string.uuid();
    const occurredOn = faker.date.recent();
    const description = 'Annual checkup, all looking good';
    // Create and save a life moment
    const lifeMoment = LifeMoment.create(
      new UUID(id),
      LifeMomentType.fromPrimitives(type),
      new UUID(petId),
      new UUID(createdBy),
      new DateValueObject(occurredOn),
      new StringValueObject(description),
    );
    await repository.save(lifeMoment);
    const findSpy = jest.spyOn(repository, 'find');

    // Act
    const query = new FindLifeMomentQuery(id);
    const foundMoment = await queryHandler.execute(query);

    // Assert
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith(new UUID(id));
    expect(foundMoment).toBeInstanceOf(LifeMoment);
    expect(foundMoment.getId().toString()).toBe(id);
    expect(foundMoment.getType().toString()).toBe(type);
    expect(foundMoment.getTheme().toString()).toBe('Wellness');
    expect(foundMoment.getPetId().toString()).toBe(petId);
    expect(foundMoment.getCreatedBy().toString()).toBe(createdBy);
    expect(foundMoment.getOccurredOn().toISOString()).toBe(occurredOn.toISOString());
    expect(foundMoment.getDescription().toString()).toBe(description);
  });
});
