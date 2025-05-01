import { Test, TestingModule } from '@nestjs/testing';
import { SearchAllPetsQuery } from './SearchAllPetsQuery';
import { SearchAllPetsUseCase } from '../../application/searchAll/SearchAllPetsUseCase';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { Pet } from '../../domain/entities/Pet';

const createMockPet = (
  id: string,
  name: string,
  gender: string,
  chipId: string,
  sterilized: boolean,
  birthdate: Date,
): Pet => {
  return Pet.fromPrimitives(id, name, gender, chipId, sterilized, birthdate);
};

describe('SearchAllPetsQuery', () => {
  let resolver: SearchAllPetsQuery;
  let useCase: SearchAllPetsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchAllPetsQuery,
        {
          provide: SearchAllPetsUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<SearchAllPetsQuery>(SearchAllPetsQuery);
    useCase = module.get<SearchAllPetsUseCase>(SearchAllPetsUseCase);
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
          faker.animal.dog(),
          'Male',
          faker.string.alphanumeric(10),
          faker.datatype.boolean(),
          faker.date.past(),
        ),
        createMockPet(
          randomUUID(),
          faker.animal.cat(),
          'Female',
          faker.string.alphanumeric(10),
          faker.datatype.boolean(),
          faker.date.past(),
        ),
      ];

      jest.spyOn(useCase, 'execute').mockResolvedValue(mockPets);

      // Act
      const result = await resolver.searchAllPets();

      // Assert
      expect(useCase.execute).toHaveBeenCalled();
      expect(result).toHaveLength(2);

      // Check that the response format is correct
      expect(result[0]).toEqual({
        id: mockPets[0].getId(),
        name: mockPets[0].getName().toString(),
        gender: mockPets[0].getGender(),
        chipId: mockPets[0].getChipId().toString(),
        sterilized: mockPets[0].isSterilized().getValue(),
        birthdate: mockPets[0].getBirthdate().toDate(),
      });

      expect(result[1]).toEqual({
        id: mockPets[1].getId(),
        name: mockPets[1].getName().toString(),
        gender: mockPets[1].getGender(),
        chipId: mockPets[1].getChipId().toString(),
        sterilized: mockPets[1].isSterilized().getValue(),
        birthdate: mockPets[1].getBirthdate().toDate(),
      });
    });

    it('should return empty array when no pets found', async () => {
      // Arrange
      jest.spyOn(useCase, 'execute').mockResolvedValue([]);

      // Act
      const result = await resolver.searchAllPets();

      // Assert
      expect(useCase.execute).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should propagate errors', async () => {
      // Arrange
      const error = new Error('Database error');
      jest.spyOn(useCase, 'execute').mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.searchAllPets()).rejects.toThrow('Database error');
    });

    it('should handle errors with no message', async () => {
      // Arrange
      jest.spyOn(useCase, 'execute').mockRejectedValue({});

      // Act & Assert
      await expect(resolver.searchAllPets()).rejects.toThrow('Error searching all pets');
    });
  });
});
