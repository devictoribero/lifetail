import { Test, TestingModule } from '@nestjs/testing';
import { AddPetMutation } from './AddPetMutation';
import { AddPetUseCase } from 'src/Lifetails/contexts/Pets/application/add/AddPetUseCase';
import { AddPetInput } from './AddPetInput';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { Gender } from 'src/Lifetails/contexts/Shared/domain/Gender';
import { Species } from 'src/Lifetails/contexts/Pets/domain/entities/PetSpecies';

describe('AddPetMutation', () => {
  let mutation: AddPetMutation;
  let useCase: AddPetUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddPetMutation,
        {
          provide: AddPetUseCase,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    mutation = module.get<AddPetMutation>(AddPetMutation);
    useCase = module.get<AddPetUseCase>(AddPetUseCase);
  });

  it('should be defined', () => {
    expect(mutation).toBeDefined();
  });

  describe('addPet', () => {
    it('should call the use case with correct command parameters', async () => {
      // Arrange
      const input: AddPetInput = {
        id: randomUUID(),
        species: Species.Cat,
        name: faker.animal.dog(),
        gender: Gender.Male,
        chipId: faker.string.alphanumeric(10),
        sterilized: faker.datatype.boolean(),
        anniversaryDate: faker.date.past(),
        userId: faker.string.uuid(),
      };

      // Act
      const result = await mutation.addPet(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          id: input.id,
          species: input.species.toString(),
          name: input.name,
          gender: input.gender.toString(),
          chipId: input.chipId,
          sterilized: input.sterilized,
          anniversaryDate: input.anniversaryDate,
        }),
      );
      expect(result).toEqual({ id: input.id });
    });

    it('should propagate errors from the use case', async () => {
      // Arrange
      const input: AddPetInput = {
        id: randomUUID(),
        species: Species.Cat,
        name: faker.animal.dog(),
        gender: Gender.Male,
        chipId: faker.string.alphanumeric(10),
        sterilized: faker.datatype.boolean(),
        anniversaryDate: faker.date.past(),
        userId: faker.string.uuid(),
      };

      const error = new Error('Invalid input');
      jest.spyOn(useCase, 'execute').mockRejectedValue(error);

      // Act & Assert
      await expect(mutation.addPet(input)).rejects.toThrow('Invalid input');
    });

    it('should handle errors with no message', async () => {
      // Arrange
      const input: AddPetInput = {
        id: randomUUID(),
        species: Species.Cat,
        name: faker.animal.dog(),
        gender: Gender.Male,
        chipId: faker.string.alphanumeric(10),
        sterilized: faker.datatype.boolean(),
        anniversaryDate: faker.date.past(),
        userId: faker.string.uuid(),
      };

      jest.spyOn(useCase, 'execute').mockRejectedValue({});

      // Act & Assert
      await expect(mutation.addPet(input)).rejects.toThrow('Error adding pet');
    });
  });
});
