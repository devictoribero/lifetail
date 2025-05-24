import { RemovePetImageCommandHandler } from './RemovePetImageCommandHandler';
import { RemovePetImageCommand } from './RemovePetImageCommand';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { ImageValueObject } from 'src/contexts/Shared/domain/ImageValueObject/ImageValueObject';
import { faker } from '@faker-js/faker';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { PetObjectMother } from '../../domain/entities/PetObjectMother.spec';

describe('RemovePetImageCommandHandler', () => {
  let repository: jest.Mocked<PetRepository>;
  let commandHandler: RemovePetImageCommandHandler;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
      findByOwner: jest.fn(),
    } as jest.Mocked<PetRepository>;
    commandHandler = new RemovePetImageCommandHandler(repository);
  });

  it('should throw PetNotFoundException when pet does not exist', async () => {
    // Given
    const nonExistentPetId = faker.string.uuid();
    const command = new RemovePetImageCommand(nonExistentPetId);
    repository.find.mockResolvedValue(null);

    // When & Then
    await expect(commandHandler.handle(command)).rejects.toThrow(PetNotFoundException);
  });

  it('should remove the pet image', async () => {
    // Given
    const pet = PetObjectMother.createWith({
      image: new ImageValueObject('images/pets/profile.jpg', new Date('2023-12-01T10:30:00Z')),
    });
    expect(pet.getImage()).not.toBeNull();
    const command = new RemovePetImageCommand(pet.getId().toString());
    repository.find.mockResolvedValue(pet);
    const saveSpy = jest.spyOn(repository, 'save');
    const findSpy = jest.spyOn(repository, 'find');

    // When
    await commandHandler.handle(command);

    // Then
    expect(findSpy).toHaveBeenCalledWith(pet.getId());
    expect(saveSpy).toHaveBeenCalledWith(pet);
    expect(pet.getImage()).toBeNull();
    expect(pet.getUpdatedAt()).not.toBeNull();
  });
});
