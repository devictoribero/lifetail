import { Test, TestingModule } from '@nestjs/testing';
import { FindPetLifeMoment } from './FindPetLifeMomentQuery';
import { FindPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/find/FindPetLifeMomentUseCase';
import { FindPetLifeMomentInput } from './FindPetLifeMomentInput';
import { randomUUID } from 'crypto';
import { PetLifeMoment } from 'src/contexts/PetLifeMoments/domain/entities/PetLifeMoment';
import { PetLifeMomentType } from 'src/contexts/PetLifeMoments/domain/entities/PetLifeMomentType';
import { PetLifeMomentTheme } from 'src/contexts/PetLifeMoments/domain/entities/PetLifeMomentTheme';
import { PetLifeMomentNotFoundException } from 'src/contexts/PetLifeMoments/domain/exceptions/PetLifeMomentNotFoundException';
import { faker } from '@faker-js/faker';

describe('FindPetLifeMoment', () => {
  let resolver: FindPetLifeMoment;
  let useCase: FindPetLifeMomentUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindPetLifeMoment,
        {
          provide: FindPetLifeMomentUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<FindPetLifeMoment>(FindPetLifeMoment);
    useCase = module.get<FindPetLifeMomentUseCase>(FindPetLifeMomentUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findPetLifeMoment', () => {
    it('should return a pet life moment when found', async () => {
      // Arrange
      const id = randomUUID();
      const input: FindPetLifeMomentInput = { id };

      const mockDate = faker.date.recent();
      const mockDescription = faker.lorem.sentence();
      const mockPetLifeMoment = createMockPetLifeMoment(
        id,
        'VeterinaryVisit',
        'Health',
        randomUUID(),
        randomUUID(),
        mockDate,
        mockDescription,
      );

      jest.spyOn(useCase, 'execute').mockResolvedValue(mockPetLifeMoment);

      // Act
      const result = await resolver.findPetLifeMoment(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(expect.objectContaining({ id }));

      expect(result).toEqual({
        id: mockPetLifeMoment.getId(),
        theme: mockPetLifeMoment.getTheme(),
        type: mockPetLifeMoment.getType(),
        petId: mockPetLifeMoment.getPetId(),
        createdBy: mockPetLifeMoment.getCreatedBy(),
        occurredOn: mockPetLifeMoment.getOccurredOn().toDate(),
        description: mockPetLifeMoment.getDescription().toString(),
      });
    });

    it('should propagate errors when pet life moment is not found', async () => {
      // Arrange
      const id = randomUUID();
      const input: FindPetLifeMomentInput = { id };

      const error = new PetLifeMomentNotFoundException(id);
      jest.spyOn(useCase, 'execute').mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.findPetLifeMoment(input)).rejects.toThrow(
        expect.objectContaining({ message: expect.stringContaining(id) }),
      );
    });
  });
});

// Helper function to create a mock PetLifeMoment for testing
function createMockPetLifeMoment(
  id: string,
  type: string,
  theme: string,
  petId: string,
  createdBy: string,
  occurredOn: Date,
  description: string,
): PetLifeMoment {
  const mockMoment = {
    getId: jest.fn().mockReturnValue(id),
    getType: jest.fn().mockReturnValue(PetLifeMomentType.fromPrimitives(type)),
    getTheme: jest.fn().mockReturnValue(PetLifeMomentTheme.fromPrimitives(theme)),
    getPetId: jest.fn().mockReturnValue(petId),
    getCreatedBy: jest.fn().mockReturnValue(createdBy),
    getOccurredOn: jest.fn().mockReturnValue({
      toDate: () => occurredOn,
    }),
    getDescription: jest.fn().mockReturnValue({
      toString: () => description,
    }),
  };

  return mockMoment as unknown as PetLifeMoment;
}
