import { Test, TestingModule } from '@nestjs/testing';
import { SearchAllPetsQuery } from './SearchAllPetsQuery';
import { SearchAllPetsQueryHandler } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsQueryHandler';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { Pet } from 'src/contexts/Lifetails/Pets/domain/entities/Pet';
import { Species } from 'src/contexts/Lifetails/Pets/domain/entities/PetSpecies';
import { Gender } from 'src/contexts/Lifetails/Shared/domain/Gender';
import { BooleanValueObject } from 'src/contexts/Lifetails/Shared/domain/BooleanValueObject';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';

describe('SearchAllPetsQuery', () => {
  let resolver: SearchAllPetsQuery;
  let queryHandler: SearchAllPetsQueryHandler;
  let ownerId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchAllPetsQuery,
        {
          provide: SearchAllPetsQueryHandler,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<SearchAllPetsQuery>(SearchAllPetsQuery);
    queryHandler = module.get<SearchAllPetsQueryHandler>(SearchAllPetsQueryHandler);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should propagate errors', async () => {
    // Arrange
    const ownerId = faker.string.uuid();
    const error = new Error('Database error');
    jest.spyOn(queryHandler, 'execute').mockRejectedValue(error);

    // Act & Assert
    await expect(resolver.searchAllPets({ ownerId })).rejects.toThrow('Database error');
  });

  it('should handle errors with no message', async () => {
    // Arrange
    const ownerId = faker.string.uuid();
    jest.spyOn(queryHandler, 'execute').mockRejectedValue({});

    // Act & Assert
    await expect(resolver.searchAllPets({ ownerId })).rejects.toThrow('Error searching all pets');
  });

  it('should return empty array when no pets found', async () => {
    // Arrange
    const ownerId = faker.string.uuid();
    jest.spyOn(queryHandler, 'execute').mockResolvedValue([]);

    // Act
    const result = await resolver.searchAllPets({ ownerId });

    // Assert
    expect(queryHandler.execute).toHaveBeenCalled();
    expect(result).toEqual([]);
  });

  it('should return all pets', async () => {
    // Arrange
    const ownerId = faker.string.uuid();
    const firstPetChipId = faker.string.alphanumeric(10);
    const firstPet = new Pet(
      faker.string.uuid(),
      Species.Dog,
      new StringValueObject(faker.animal.dog()),
      Gender.Male,
      new BooleanValueObject(faker.datatype.boolean()),
      new DateValueObject(faker.date.past()),
      new DateValueObject(faker.date.past()),
      ownerId,
      new StringValueObject(firstPetChipId),
    );
    const secondPet = new Pet(
      faker.string.uuid(),
      Species.Cat,
      new StringValueObject(faker.animal.cat()),
      Gender.Female,
      new BooleanValueObject(faker.datatype.boolean()),
      new DateValueObject(faker.date.past()),
      new DateValueObject(faker.date.past()),
      ownerId,
      null,
    );
    const mockPets = [firstPet, secondPet];
    jest.spyOn(queryHandler, 'execute').mockResolvedValue(mockPets);

    // Act
    const result = await resolver.searchAllPets({ ownerId });

    // Assert
    expect(queryHandler.execute).toHaveBeenCalled();
    expect(result).toHaveLength(2);

    // Check that the response format is correct
    const firstPetPrimitives = firstPet.toPrimitives();
    expect(result[0]).toEqual({
      id: firstPetPrimitives.id,
      species: firstPetPrimitives.species,
      name: firstPetPrimitives.name,
      gender: firstPetPrimitives.gender,
      sterilized: firstPetPrimitives.sterilized,
      anniversaryDate: firstPetPrimitives.anniversaryDate,
      createdAt: firstPetPrimitives.createdAt,
      userId: firstPetPrimitives.userId,
      chipId: firstPetPrimitives.chipId,
    });

    const secondPetPrimitives = secondPet.toPrimitives();
    expect(result[1]).toEqual({
      id: secondPetPrimitives.id,
      species: secondPetPrimitives.species,
      name: secondPetPrimitives.name,
      gender: secondPetPrimitives.gender,
      sterilized: secondPetPrimitives.sterilized,
      anniversaryDate: secondPetPrimitives.anniversaryDate,
      createdAt: secondPetPrimitives.createdAt,
      userId: secondPetPrimitives.userId,
      chipId: secondPetPrimitives.chipId,
    });
  });
});
