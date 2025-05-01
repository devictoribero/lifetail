import { Test, TestingModule } from '@nestjs/testing';
import { AddPetMutation } from './AddPetMutation';
import { AddPetUseCase } from '../../application/add/AddPetUseCase';
import { AddPetInput } from './AddPetInput';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { PetGender } from '../../domain/entities/PetGender';

describe('AddPetMutation', () => {
  let resolver: AddPetMutation;
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

    resolver = module.get<AddPetMutation>(AddPetMutation);
    useCase = module.get<AddPetUseCase>(AddPetUseCase);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('addPet', () => {
    it('should call the use case with correct command parameters', async () => {
      // Arrange
      const input: AddPetInput = {
        id: randomUUID(),
        name: faker.animal.dog(),
        gender: PetGender.Male,
        chipId: faker.string.alphanumeric(10),
        sterilized: faker.datatype.boolean(),
        birthdate: faker.date.past(),
      };

      // Act
      const result = await resolver.addPet(input);

      // Assert
      expect(useCase.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          id: input.id,
          name: input.name,
          gender: input.gender.toString(),
          chipId: input.chipId,
          sterilized: input.sterilized,
          birthdate: input.birthdate,
        }),
      );
      expect(result).toEqual({ id: input.id });
    });

    it('should propagate errors from the use case', async () => {
      // Arrange
      const input: AddPetInput = {
        id: randomUUID(),
        name: faker.animal.dog(),
        gender: PetGender.Male,
        chipId: faker.string.alphanumeric(10),
        sterilized: faker.datatype.boolean(),
        birthdate: faker.date.past(),
      };

      const error = new Error('Invalid input');
      jest.spyOn(useCase, 'execute').mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.addPet(input)).rejects.toThrow('Invalid input');
    });

    it('should handle errors with no message', async () => {
      // Arrange
      const input: AddPetInput = {
        id: randomUUID(),
        name: faker.animal.dog(),
        gender: PetGender.Male,
        chipId: faker.string.alphanumeric(10),
        sterilized: faker.datatype.boolean(),
        birthdate: faker.date.past(),
      };

      jest.spyOn(useCase, 'execute').mockRejectedValue({});

      // Act & Assert
      await expect(resolver.addPet(input)).rejects.toThrow('Error adding pet');
    });
  });
});
