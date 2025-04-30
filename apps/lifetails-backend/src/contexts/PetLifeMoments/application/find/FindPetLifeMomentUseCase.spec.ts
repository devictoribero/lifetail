import { PetLifeMomentInMemoryRepository } from '../../infrastructure/PetLifeMomentInMemoryRepository';
import { FindPetLifeMomentUseCase } from './FindPetLifeMomentUseCase';
import { FindPetLifeMomentQuery } from './FindPetLifeMomentQuery';
import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentNotFoundException } from '../../domain/exceptions/PetLifeMomentNotFoundException';
import { randomUUID } from 'node:crypto';
import { PetLifeMomentType } from '../../domain/entities/PetLifeMomentType';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

describe('FindPetLifeMomentUseCase', () => {
  let repository: PetLifeMomentInMemoryRepository;
  let useCase: FindPetLifeMomentUseCase;

  beforeEach(() => {
    repository = new PetLifeMomentInMemoryRepository();
    useCase = new FindPetLifeMomentUseCase(repository);
  });

  it('should find a pet life moment by id', async () => {
    // Arrange
    const id = randomUUID();
    const type = 'VeterinaryVisit';
    const petId = randomUUID();
    const createdBy = randomUUID();
    const occurredOn = new Date('2023-05-15T10:00:00Z');
    const description = 'Annual checkup, all looking good';
    // Create and save a pet life moment
    const petLifeMoment = PetLifeMoment.create(
      id,
      PetLifeMomentType.fromPrimitives(type),
      petId,
      createdBy,
      occurredOn,
      new StringValueObject(description),
    );
    await repository.save(petLifeMoment);
    const findSpy = jest.spyOn(repository, 'find');
    const query = new FindPetLifeMomentQuery(id);

    // Act
    const foundMoment = await useCase.execute(query);

    // Assert
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith(id);
    expect(foundMoment).toBeInstanceOf(PetLifeMoment);
    expect(foundMoment.getId()).toBe(id);
    expect(foundMoment.getType().toString()).toBe(type);
    expect(foundMoment.getTheme().toString()).toBe('Health');
    expect(foundMoment.getPetId()).toBe(petId);
    expect(foundMoment.getCreatedBy()).toBe(createdBy);
    expect(foundMoment.getOccurredOn().toISOString()).toBe(occurredOn.toISOString());
    expect(foundMoment.getDescription().toString()).toBe(description);
  });

  it('should throw PetLifeMomentNotFoundException when pet life moment does not exist', async () => {
    // Arrange
    const nonExistentId = randomUUID();
    const query = new FindPetLifeMomentQuery(nonExistentId);

    // Act & Assert
    await expect(useCase.execute(query)).rejects.toThrow(
      new PetLifeMomentNotFoundException(nonExistentId),
    );
  });
});
