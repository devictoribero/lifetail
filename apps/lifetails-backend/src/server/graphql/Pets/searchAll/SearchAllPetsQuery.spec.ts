import { Test, TestingModule } from '@nestjs/testing';
import { SearchAllPetsQuery } from './SearchAllPetsQuery';
import { SearchAllPetsQueryHandler } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsQueryHandler';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { Pet } from 'src/contexts/Lifetails/Pets/domain/entities/Pet';
import { Species } from 'src/contexts/Lifetails/Pets/domain/entities/PetSpecies';

const createMockPet = (
  id: string,
  species: string,
  name: string,
  gender: string,
  chipId: string,
  sterilized: boolean,
  anniversaryDate: Date,
  createdAt: Date,
  userId: string,
): Pet => {
  return Pet.fromPrimitives(
    id,
    species,
    name,
    gender,
    chipId,
    sterilized,
    anniversaryDate,
    createdAt,
    userId,
  );
};

describe('SearchAllPetsQuery', () => {
  let resolver: SearchAllPetsQuery;
  let queryHandler: SearchAllPetsQueryHandler;
  let userId: string;

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

  describe('searchAllPets', () => {
    it('should return all pets', async () => {
      // Arrange
      const mockPets = [
        createMockPet(
          randomUUID(),
          Species.Dog.toString(),
          faker.animal.dog(),
          'Male',
          faker.string.alphanumeric(10),
          faker.datatype.boolean(),
          faker.date.past(),
          faker.date.past(),
          userId,
        ),
        createMockPet(
          randomUUID(),
          Species.Cat.toString(),
          faker.animal.cat(),
          'Female',
          faker.string.alphanumeric(10),
          faker.datatype.boolean(),
          faker.date.past(),
          faker.date.past(),
          userId,
        ),
      ];

      jest.spyOn(queryHandler, 'execute').mockResolvedValue(mockPets);

      // Act
      const result = await resolver.searchAllPets(userId);

      // Assert
      expect(queryHandler.execute).toHaveBeenCalled();
      expect(result).toHaveLength(2);

      // Check that the response format is correct
      expect(result[0]).toEqual({
        id: mockPets[0].getId(),
        name: mockPets[0].getName().toString(),
        gender: mockPets[0].getGender(),
        chipId: mockPets[0].getChipId().toString(),
        sterilized: mockPets[0].isSterilized().getValue(),
        anniversaryDate: mockPets[0].getAnniversaryDate().toDate(),
      });

      expect(result[1]).toEqual({
        id: mockPets[1].getId(),
        name: mockPets[1].getName().toString(),
        gender: mockPets[1].getGender(),
        chipId: mockPets[1].getChipId().toString(),
        sterilized: mockPets[1].isSterilized().getValue(),
        anniversaryDate: mockPets[1].getAnniversaryDate().toDate(),
      });
    });

    it('should return empty array when no pets found', async () => {
      // Arrange
      jest.spyOn(queryHandler, 'execute').mockResolvedValue([]);

      // Act
      const result = await resolver.searchAllPets(userId);

      // Assert
      expect(queryHandler.execute).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should propagate errors', async () => {
      // Arrange
      const error = new Error('Database error');
      jest.spyOn(queryHandler, 'execute').mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.searchAllPets(userId)).rejects.toThrow('Database error');
    });

    it('should handle errors with no message', async () => {
      // Arrange
      jest.spyOn(queryHandler, 'execute').mockRejectedValue({});

      // Act & Assert
      await expect(resolver.searchAllPets(userId)).rejects.toThrow('Error searching all pets');
    });
  });
});
