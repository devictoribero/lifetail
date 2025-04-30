import { Test, TestingModule } from '@nestjs/testing';
import { FindPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/findById/FindPetLifeMomentUseCase';
import { FindPetLifeMomentQuery as FindByIdQuery } from 'src/contexts/PetLifeMoments/application/findById/FindPetLifeMomentQuery';
import {
  PetLifeMoment,
  PetLifeMomentType,
} from 'src/contexts/PetLifeMoments/domain/entities/PetLifeMoment';
import { PetLifeMomentByIdQuery } from './FindPetLifeMomentQuery';
import { FindPetLifeMomentInput } from './FindPetLifeMomentInput';

describe('PetLifeMomentByIdQuery', () => {
  let resolver: PetLifeMomentByIdQuery;
  let useCaseMock: jest.Mocked<FindPetLifeMomentUseCase>;

  const mockPetLifeMoment = new PetLifeMoment(
    '123',
    PetLifeMomentType.Walk,
    'pet-123',
    'user-123',
    new Date('2023-01-01'),
    'A nice walk in the park',
  );

  beforeEach(async () => {
    // Create a mock for the FindPetLifeMomentUseCase
    useCaseMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindPetLifeMomentUseCase>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetLifeMomentByIdQuery,
        {
          provide: FindPetLifeMomentUseCase,
          useValue: useCaseMock,
        },
      ],
    }).compile();

    resolver = module.get<PetLifeMomentByIdQuery>(PetLifeMomentByIdQuery);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findPetLifeMoment', () => {
    it('should return a pet life moment when found', async () => {
      // Arrange
      const input: FindPetLifeMomentInput = { id: '123' };
      useCaseMock.execute.mockResolvedValue(mockPetLifeMoment);

      // Act
      const result = await resolver.findPetLifeMoment(input);

      // Assert
      expect(useCaseMock.execute).toHaveBeenCalledWith(new FindByIdQuery('123'));
      expect(result).toEqual({
        id: mockPetLifeMoment.getId(),
        theme: mockPetLifeMoment.getTheme(),
        type: mockPetLifeMoment.getType(),
        petId: mockPetLifeMoment.getPetId(),
        createdBy: mockPetLifeMoment.getCreatedBy(),
        occurredOn: mockPetLifeMoment.getOccurredOn(),
        description: mockPetLifeMoment.getDescription(),
      });
    });

    it('should throw an error when use case throws an error', async () => {
      // Arrange
      const input: FindPetLifeMomentInput = { id: '123' };
      const error = new Error('PetLifeMoment not found');
      useCaseMock.execute.mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.findPetLifeMoment(input)).rejects.toThrow('PetLifeMoment not found');
      expect(useCaseMock.execute).toHaveBeenCalledWith(new FindByIdQuery('123'));
    });

    it('should throw a generic error when use case throws an error without message', async () => {
      // Arrange
      const input: FindPetLifeMomentInput = { id: '123' };
      useCaseMock.execute.mockRejectedValue({});

      // Act & Assert
      await expect(resolver.findPetLifeMoment(input)).rejects.toThrow(
        'Error finding pet life moment',
      );
      expect(useCaseMock.execute).toHaveBeenCalledWith(new FindByIdQuery('123'));
    });
  });
});
