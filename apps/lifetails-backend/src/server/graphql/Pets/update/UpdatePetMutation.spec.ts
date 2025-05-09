import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePetMutation } from './UpdatePetMutation';
import { UpdatePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/update/UpdatePetCommandHandler';
import { UpdatePetInput } from './UpdatePetInput';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { Gender } from 'src/contexts/Lifetails/Shared/domain/Gender';

describe('UpdatePetMutation', () => {
  let resolver: UpdatePetMutation;
  let commandHandler: UpdatePetCommandHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePetMutation,
        {
          provide: UpdatePetCommandHandler,
          useValue: {
            execute: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    resolver = module.get<UpdatePetMutation>(UpdatePetMutation);
    commandHandler = module.get<UpdatePetCommandHandler>(UpdatePetCommandHandler);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should propagate errors from the command handler', async () => {
    // Arrange
    const input: UpdatePetInput = { id: randomUUID(), name: faker.animal.dog() };
    const error = new Error('Pet not found');
    jest.spyOn(commandHandler, 'execute').mockRejectedValue(error);

    // Act & Assert
    await expect(resolver.updatePet(input)).rejects.toThrow('Pet not found');
  });

  it('should handle errors with no message', async () => {
    // Arrange
    const input: UpdatePetInput = { id: randomUUID(), name: faker.animal.dog() };
    jest.spyOn(commandHandler, 'execute').mockRejectedValue({});

    // Act & Assert
    await expect(resolver.updatePet(input)).rejects.toThrow('Error updating pet');
  });

  it('should call the command handler with all fields', async () => {
    // Arrange
    const input: UpdatePetInput = {
      id: randomUUID(),
      name: faker.animal.dog(),
      gender: Gender.Male,
      sterilized: faker.datatype.boolean(),
      anniversaryDate: faker.date.past(),
      chipId: faker.string.alphanumeric(10),
    };

    // Act
    const result = await resolver.updatePet(input);

    // Assert
    expect(commandHandler.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        id: input.id,
        name: input.name,
        gender: input.gender.toString(),
        chipId: input.chipId,
        sterilized: input.sterilized,
        anniversaryDate: input.anniversaryDate,
      }),
    );
    expect(result).toEqual({ id: input.id });
  });

  it('should call the command handler with partial fields', async () => {
    // Arrange
    const input: UpdatePetInput = { id: randomUUID(), name: faker.animal.dog() };

    // Act
    const result = await resolver.updatePet(input);

    // Assert
    expect(commandHandler.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        id: input.id,
        name: input.name,
        gender: undefined,
        chipId: undefined,
        sterilized: undefined,
        anniversaryDate: undefined,
      }),
    );
    expect(result).toEqual({ id: input.id });
  });
});
