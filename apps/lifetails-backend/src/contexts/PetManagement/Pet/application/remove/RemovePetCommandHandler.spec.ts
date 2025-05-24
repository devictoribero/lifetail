import { RemovePetCommandHandler } from './RemovePetCommandHandler';
import { RemovePetCommand } from './RemovePetCommand';
import { Pet } from '../../domain/entities/Pet';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { EventBus } from 'src/contexts/Shared/domain/EventBus';
import { PetObjectMother } from '../../domain/entities/PetObjectMother.spec';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

describe('RemovePetCommandHandler', () => {
  let repository: jest.Mocked<PetRepository>;
  let commandHandler: RemovePetCommandHandler;
  let mockEventBus: jest.Mocked<EventBus>;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
      findByOwner: jest.fn(),
    } as jest.Mocked<PetRepository>;
    mockEventBus = {
      publish: jest.fn(),
    } as jest.Mocked<EventBus>;
    commandHandler = new RemovePetCommandHandler(repository, mockEventBus);
  });

  it('should throw a PetNotFoundException when the pet does not exist', async () => {
    // Arrange
    repository.find.mockResolvedValue(null);
    const command = new RemovePetCommand(UUID.generate().toString());

    await expect(commandHandler.handle(command)).rejects.toThrow(PetNotFoundException);
  });

  it('should remove a pet', async () => {
    // Arrange
    const pet = PetObjectMother.create();
    // We remove the pet.added events from the pet instance
    pet.pullDomainEvents();
    repository.find.mockResolvedValue(pet);
    const command = new RemovePetCommand(pet.getId().toString());
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(findSpy).toHaveBeenCalledWith(pet.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...pet,
      deletedAt: expect.any(DateValueObject),
    });
    expect(mockEventBus.publish).toHaveBeenCalledWith([]);
  });
});
