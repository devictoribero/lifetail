import { ChangePetImageCommandHandler } from './ChangePetImageCommandHandler';
import { ChangePetImageCommand } from './ChangePetImageCommand';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { ImageValueObject } from 'src/contexts/Shared/domain/ImageValueObject/ImageValueObject';
import { faker } from '@faker-js/faker';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { PetObjectMother } from '../../domain/entities/PetObjectMother.spec';
import { EmptyImageKeyException } from 'src/contexts/Shared/domain/ImageValueObject/EmptyImageKeyException';
import { InvalidImageUploadDateException } from 'src/contexts/Shared/domain/ImageValueObject/InvalidImageUploadDateException';

describe('ChangePetImageCommandHandler', () => {
  let repository: jest.Mocked<PetRepository>;
  let commandHandler: ChangePetImageCommandHandler;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
      findByOwner: jest.fn(),
    } as jest.Mocked<PetRepository>;
    commandHandler = new ChangePetImageCommandHandler(repository);
  });

  it('should throw PetNotFoundException when pet does not exist', async () => {
    // Given
    const nonExistentPetId = faker.string.uuid();
    const imageKey = 'images/pets/profile.jpg';
    const imageUploadedAt = faker.date.recent();
    const command = new ChangePetImageCommand(nonExistentPetId, imageKey, imageUploadedAt);
    repository.find.mockResolvedValue(null);

    // When & Then
    await expect(commandHandler.handle(command)).rejects.toThrow(PetNotFoundException);
  });

  it('should throw error EmptyImageKeyException when image key is empty', async () => {
    // Given
    const pet = PetObjectMother.create();
    const emptyImageKey = '';
    const imageUploadedAt = faker.date.recent();
    const command = new ChangePetImageCommand(
      pet.getId().toString(),
      emptyImageKey,
      imageUploadedAt,
    );
    repository.find.mockResolvedValue(pet);

    // When & Then
    await expect(commandHandler.handle(command)).rejects.toThrow(EmptyImageKeyException);
  });

  it('should throw error InvalidImageUploadDateException when image uploaded date is invalid', async () => {
    // Given
    const pet = PetObjectMother.create();
    const imageKey = 'images/pets/profile.jpg';
    const invalidDate = new Date('invalid-date');
    const command = new ChangePetImageCommand(pet.getId().toString(), imageKey, invalidDate);
    repository.find.mockResolvedValue(pet);

    // When & Then
    await expect(commandHandler.handle(command)).rejects.toThrow(InvalidImageUploadDateException);
  });

  it('should change the pet image when has no image', async () => {
    // Given
    const imageKey = 'images/pets/profile_12345.jpg';
    const imageUploadedAt = new Date('2023-12-01T10:30:00Z');
    const pet = PetObjectMother.create();
    const command = new ChangePetImageCommand(pet.getId().toString(), imageKey, imageUploadedAt);
    repository.find.mockResolvedValue(pet);
    const saveSpy = jest.spyOn(repository, 'save');
    const findSpy = jest.spyOn(repository, 'find');

    // When
    expect(pet.getImage()).toBeNull();
    await commandHandler.handle(command);

    // Then
    expect(findSpy).toHaveBeenCalledWith(pet.getId());
    expect(saveSpy).toHaveBeenCalledWith(pet);
  });

  it('should replace an existing pet image', async () => {
    // Given
    const existingImage = new ImageValueObject(
      'images/pets/old.jpg',
      new Date('2023-01-01T10:00:00Z'),
    );
    const pet = PetObjectMother.createWith({ image: existingImage });
    const newImageKey = 'images/pets/new_photo.jpg';
    const newImageUploadedAt = new Date('2023-12-01T10:30:00Z');
    const command = new ChangePetImageCommand(
      pet.getId().toString(),
      newImageKey,
      newImageUploadedAt,
    );
    repository.find.mockResolvedValue(pet);
    const saveSpy = jest.spyOn(repository, 'save');
    const findSpy = jest.spyOn(repository, 'find');

    // When
    expect(pet.getImage()).toEqual(existingImage);
    await commandHandler.handle(command);

    // Then
    expect(findSpy).toHaveBeenCalledWith(pet.getId());
    expect(saveSpy).toHaveBeenCalledWith(pet);
  });
});
