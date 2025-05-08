import { PetLifeMomentInMemoryRepository } from '../../infrastructure/PetLifeMomentInMemoryRepository';
import { FindPetLifeMomentQueryHandler } from './FindPetLifeMomentQueryHandler';
import { FindPetLifeMomentQuery } from './FindPetLifeMomentQuery';
import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentNotFoundException } from '../../domain/exceptions/PetLifeMomentNotFoundException';
import { randomUUID } from 'node:crypto';
import { PetLifeMomentType } from '../../domain/entities/PetLifeMomentType';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { faker } from '@faker-js/faker';

describe('FindPetLifeMomentQueryHandler', () => {
  let repository: PetLifeMomentInMemoryRepository;
  let queryHandler: FindPetLifeMomentQueryHandler;

  beforeEach(() => {
    repository = new PetLifeMomentInMemoryRepository();
    queryHandler = new FindPetLifeMomentQueryHandler(repository);
  });

  it('should throw PetLifeMomentNotFoundException when pet life moment does not exist', async () => {
    // Arrange
    const nonExistentId = randomUUID();
    const query = new FindPetLifeMomentQuery(nonExistentId);

    // Act & Assert
    await expect(queryHandler.execute(query)).rejects.toThrow(
      new PetLifeMomentNotFoundException(nonExistentId),
    );
  });

  it('should find a pet life moment', async () => {
    // Arrange
    const id = randomUUID();
    const type = 'VeterinaryVisit';
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = faker.date.recent();
    const description = 'Annual checkup, all looking good';
    // Create and save a pet life moment
    const petLifeMoment = PetLifeMoment.create(
      id,
      PetLifeMomentType.fromPrimitives(type),
      petId,
      createdBy,
      new DateValueObject(occurredOn),
      new StringValueObject(description),
    );
    await repository.save(petLifeMoment);
    const findSpy = jest.spyOn(repository, 'find');
    const query = new FindPetLifeMomentQuery(id);

    // Act
    const foundMoment = await queryHandler.execute(query);

    // Assert
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith(id);
    expect(foundMoment).toBeInstanceOf(PetLifeMoment);
    expect(foundMoment.getId()).toBe(id);
    expect(foundMoment.getType().toString()).toBe(type);
    expect(foundMoment.getTheme().toString()).toBe('Wellness');
    expect(foundMoment.getPetId()).toBe(petId);
    expect(foundMoment.getCreatedBy()).toBe(createdBy);
    expect(foundMoment.getOccurredOn().toISOString()).toBe(occurredOn.toISOString());
    expect(foundMoment.getDescription().toString()).toBe(description);
  });
});
