import { SearchAllPetsQueryHandler } from './SearchAllPetsQueryHandler';
import { SearchAllPetsQuery } from './SearchAllPetsQuery';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Pet } from '../../domain/entities/Pet';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { Species } from '../../domain/entities/PetSpecies';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';

describe('SearchAllPetsQueryHandler', () => {
  let queryHandler: SearchAllPetsQueryHandler;
  let repository: PetRepository;
  let ownerId: UUID;

  beforeEach(() => {
    repository = new PetInMemoryRepository();
    queryHandler = new SearchAllPetsQueryHandler(repository);
    ownerId = UUID.generate();
  });

  it('should return an empty array when no pets found', async () => {
    // Arrange
    repository.findByOwner = jest.fn().mockResolvedValue([]);

    // Act
    const query = new SearchAllPetsQuery(ownerId.toString());
    const result = await queryHandler.handle(query);

    // Assert
    expect(repository.findByOwner).toHaveBeenCalledWith(ownerId);
    expect(result).toEqual([]);
  });

  it('should return all pets for an owner', async () => {
    // Arrange
    const petId1 = UUID.generate();
    const petId2 = UUID.generate();

    // Create two pets
    const pet1 = Pet.create({
      id: petId1,
      species: Species.fromPrimitives('Dog'),
      name: new StringValueObject('Max'),
      gender: Gender.fromPrimitives('Male'),
      sterilized: new BooleanValueObject(true),
      anniversaryDate: new DateValueObject(new Date('2020-01-01')),
      ownerId,
      color: new StringValueObject('Black'),
    });

    const pet2 = Pet.create({
      id: petId2,
      species: Species.fromPrimitives('Cat'),
      name: new StringValueObject('Lucy'),
      gender: Gender.fromPrimitives('Female'),
      sterilized: new BooleanValueObject(false),
      anniversaryDate: new DateValueObject(new Date('2021-05-15')),
      ownerId,
      color: new StringValueObject('White'),
    });

    const pets = [pet1, pet2];
    repository.findByOwner = jest.fn().mockResolvedValue(pets);

    // Act
    const query = new SearchAllPetsQuery(ownerId.toString());
    const result = await queryHandler.handle(query);

    // Assert
    expect(repository.findByOwner).toHaveBeenCalledWith(ownerId);
    expect(result).toHaveLength(2);
    expect(result[0].getId()).toEqual(petId1);
    expect(result[1].getId()).toEqual(petId2);
  });
});
