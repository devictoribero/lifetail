import { SearchAllPetsQueryHandler } from './SearchAllPetsQueryHandler';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { SearchAllPetsQuery } from './SearchAllPetsQuery';
import { Pet } from '../../domain/entities/Pet';
import { Species } from '../../domain/entities/PetSpecies';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { faker } from '@faker-js/faker';
import { UUID } from 'src/contexts/Shared/domain/UUID';

describe('SearchAllPetsQueryHandler', () => {
  let repository: PetInMemoryRepository;
  let queryHandler: SearchAllPetsQueryHandler;
  const ownerId = faker.string.uuid();

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    queryHandler = new SearchAllPetsQueryHandler(repository);
  });

  it('should return empty array when no pets exist for the requested owner', async () => {
    const query = new SearchAllPetsQuery(ownerId);
    const result = await queryHandler.execute(query);
    expect(result).toEqual([]);
  });

  it('should return all pets for the requested owner', async () => {
    const ownerId = faker.string.uuid();
    const pet1 = new Pet(
      new UUID(faker.string.uuid()),
      Species.Cat,
      new StringValueObject('Neko'),
      Gender.fromPrimitives('Female'),
      new BooleanValueObject(true),
      new DateValueObject(new Date('2022-01-01')),
      new DateValueObject(new Date('2022-01-01')),
      new UUID(ownerId),
    );
    const pet2 = new Pet(
      new UUID(faker.string.uuid()),
      Species.Dog,
      new StringValueObject('Inu'),
      Gender.fromPrimitives('Male'),
      new BooleanValueObject(false),
      new DateValueObject(new Date('2022-02-02')),
      new DateValueObject(new Date('2022-02-02')),
      new UUID(ownerId),
    );
    // Create a pet for a different user
    const otherOwnerId = faker.string.uuid();
    const pet3 = new Pet(
      new UUID(faker.string.uuid()),
      Species.Dog,
      new StringValueObject('Hanstah'),
      Gender.fromPrimitives('Female'),
      new BooleanValueObject(true),
      new DateValueObject(new Date('2022-03-03')),
      new DateValueObject(new Date('2022-03-03')),
      new UUID(otherOwnerId),
    );

    await repository.save(pet1);
    await repository.save(pet2);
    await repository.save(pet3);

    const findSpy = jest.spyOn(repository, 'findByOwner');
    const query = new SearchAllPetsQuery(ownerId);

    // Act
    const result = await queryHandler.execute(query);

    // Assert
    expect(findSpy).toHaveBeenCalledTimes(1);
    expect(findSpy).toHaveBeenCalledWith(new UUID(ownerId));
    expect(result).toHaveLength(2);
    expect(result[0].getId()).toEqual(pet1.getId());
    expect(result[1].getId()).toEqual(pet2.getId());
  });
});
