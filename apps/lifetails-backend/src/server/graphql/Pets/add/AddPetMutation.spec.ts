import { Test, TestingModule } from '@nestjs/testing';
import { AddPetCommandHandler } from 'src/contexts/Lifetails/Pets/application/add/AddPetCommandHandler';
import { AddPetMutation } from './AddPetMutation';
import { AddPetInput } from './AddPetInput';
import { randomUUID } from 'node:crypto';
import { faker } from '@faker-js/faker';
import { Gender } from 'src/contexts/Lifetails/Shared/domain/Gender';
import { Species } from 'src/contexts/Lifetails/Pets/domain/entities/PetSpecies';

describe('AddPetMutation', () => {
  let mutation: AddPetMutation;
  let commandHandler: AddPetCommandHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddPetMutation,
        {
          provide: AddPetCommandHandler,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    mutation = module.get<AddPetMutation>(AddPetMutation);
    commandHandler = module.get<AddPetCommandHandler>(AddPetCommandHandler);
  });

  it('should be defined', () => {
    expect(mutation).toBeDefined();
  });

  it('should call the command handler with correct command parameters', async () => {
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
    expect(commandHandler.execute).toHaveBeenCalledWith(
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
});
