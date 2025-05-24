import { UUID } from 'src/contexts/Shared/domain/UUID';
import { VeterinaryRepository } from '../../domain/repositories/VeterinaryRepository';
import { DeleteVeterinaryCommand } from './DeleteVeterinaryCommand';
import { DeleteVeterinaryCommandHandler } from './DeleteVeterinaryCommandHandler';
import { faker } from '@faker-js/faker';
import { VeterinaryNotFoundException } from '../../domain/exceptions/VeterinaryNotFoundException';
import { Veterinary } from '../../domain/entities/Veterinary';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { VeterinaryInMemoryRepository } from '../../infrastructure/VeterinaryInMemoryRepository';
import { VeterinaryObjectMother } from '../../domain/entities/VeterinaryObjectMother.spec';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

describe('DeleteVeterinaryCommandHandler', () => {
  let handler: DeleteVeterinaryCommandHandler;
  let repository: jest.Mocked<VeterinaryRepository>;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
    } as unknown as jest.Mocked<VeterinaryRepository>;
    handler = new DeleteVeterinaryCommandHandler(repository);
  });

  it('should throw VeterinaryNotFoundException when veterinary does not exist', async () => {
    // Arrange
    const veterinary = VeterinaryObjectMother.create();
    const id = veterinary.getId().toString();
    const command = new DeleteVeterinaryCommand(id);
    repository.find.mockResolvedValue(null);

    // Act/Assert
    await expect(handler.handle(command)).rejects.toThrow(VeterinaryNotFoundException);
  });

  it('should delete a veterinary when it exists', async () => {
    // Arrange
    const veterinary = VeterinaryObjectMother.create();
    const id = veterinary.getId().toString();
    repository.find.mockResolvedValue(veterinary);
    const command = new DeleteVeterinaryCommand(id);
    const saveSpy = jest.spyOn(repository, 'save');
    const findSpy = jest.spyOn(repository, 'find');

    // Act
    await handler.handle(command);

    // Then
    expect(findSpy).toHaveBeenCalledWith(veterinary.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...veterinary,
      deletedAt: expect.any(DateValueObject),
    });
  });
});
