import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePetMutation } from './UpdatePetMutation';
import { UpdatePetUseCase } from '../../application/update/UpdatePetUseCase';
import { UpdatePetInput } from './UpdatePetInput';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { PetGender } from '../../domain/entities/PetGender';
describe('UpdatePetMutation', () => {
  let resolver: UpdatePetMutation;
  let useCase: UpdatePetUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePetMutation,
        {
          provide: UpdatePetUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    resolver = module.get<UpdatePetMutation>(UpdatePetMutation);
    useCase = module.get<UpdatePetUseCase>(UpdatePetUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('updatePet', () => {
    it('should call the use case with all fields', async () => {
      // Arrange
      const input: UpdatePetInput = {
        id: randomUUID(),
        name: faker.animal.dog(),
        gender: PetGender.Male,
        chipId: faker.string.alphanumeric(10),
        sterilized: faker.datatype.boolean(),
        birthDate: faker.date.past(),
      };

      // Act
      const result = await resolver.updatePet(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          id: input.id,
          name: input.name,
          gender: input.gender.toString(),
          chipId: input.chipId,
          sterilized: input.sterilized,
          birthDate: input.birthDate,
        }),
      );
      expect(result).toEqual({ id: input.id });
    });

    it('should call the use case with partial fields', async () => {
      // Arrange
      const input: UpdatePetInput = {
        id: randomUUID(),
        name: faker.animal.dog(),
      };

      // Act
      const result = await resolver.updatePet(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          id: input.id,
          name: input.name,
          gender: undefined,
          chipId: undefined,
          sterilized: undefined,
          birthDate: undefined,
        }),
      );
      expect(result).toEqual({ id: input.id });
    });

    it('should propagate errors from the use case', async () => {
      // Arrange
      const input: UpdatePetInput = {
        id: randomUUID(),
        name: faker.animal.dog(),
      };

      const error = new Error('Pet not found');
      jest.spyOn(useCase, 'execute').mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.updatePet(input)).rejects.toThrow('Pet not found');
    });

    it('should handle errors with no message', async () => {
      // Arrange
      const input: UpdatePetInput = {
        id: randomUUID(),
        name: faker.animal.dog(),
      };

      jest.spyOn(useCase, 'execute').mockRejectedValue({});

      // Act & Assert
      await expect(resolver.updatePet(input)).rejects.toThrow('Error updating pet');
    });
  });
});
