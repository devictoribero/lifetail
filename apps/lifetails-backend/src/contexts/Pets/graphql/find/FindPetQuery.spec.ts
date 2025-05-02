import { Test, TestingModule } from '@nestjs/testing';
import { FindPetQuery } from './FindPetQuery';
import { FindPetUseCase } from '../../application/find/FindPetUseCase';
import { FindPetInput } from './FindPetInput';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { Pet } from '../../domain/entities/Pet';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { PetGender } from '../../domain/entities/PetGender';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

const createMockPet = (
  id: string,
  name: string,
  gender: string,
  chipId: string,
  sterilized: boolean,
  birthDate: Date,
  createdAt: Date,
): Pet => {
  return Pet.fromPrimitives(id, name, gender, chipId, sterilized, birthDate, createdAt);
};

describe('FindPetQuery', () => {
  let resolver: FindPetQuery;
  let useCase: FindPetUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindPetQuery,
        {
          provide: FindPetUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<FindPetQuery>(FindPetQuery);
    useCase = module.get<FindPetUseCase>(FindPetUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findPet', () => {
    it('should return a pet when found', async () => {
      // Arrange
      const id = randomUUID();
      const input: FindPetInput = { id };

      const mockName = faker.animal.dog();
      const mockGender = 'Male';
      const mockChipId = faker.string.alphanumeric(10);
      const mockSterilized = faker.datatype.boolean();
      const mockBirthdate = faker.date.past();
      const mockCreatedAt = faker.date.past();

      const mockPet = createMockPet(
        id,
        mockName,
        mockGender,
        mockChipId,
        mockSterilized,
        mockBirthdate,
        mockCreatedAt,
      );

      jest.spyOn(useCase, 'execute').mockResolvedValue(mockPet);

      // Act
      const result = await resolver.findPet(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(expect.objectContaining({ id }));

      expect(result).toEqual({
        id: mockPet.getId(),
        name: mockPet.getName().toString(),
        gender: mockPet.getGender(),
        chipId: mockPet.getChipId().toString(),
        sterilized: mockPet.isSterilized().getValue(),
        birthDate: mockPet.getBirthdate().toDate(),
      });
    });

    it('should propagate errors when pet is not found', async () => {
      // Arrange
      const id = randomUUID();
      const input: FindPetInput = { id };

      const error = new Error(`Pet with id ${id} not found`);
      jest.spyOn(useCase, 'execute').mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.findPet(input)).rejects.toThrow(
        expect.objectContaining({ message: expect.stringContaining(id) }),
      );
    });

    it('should handle errors with no message', async () => {
      // Arrange
      const id = randomUUID();
      const input: FindPetInput = { id };

      jest.spyOn(useCase, 'execute').mockRejectedValue({});

      // Act & Assert
      await expect(resolver.findPet(input)).rejects.toThrow('Error finding pet');
    });
  });
});
