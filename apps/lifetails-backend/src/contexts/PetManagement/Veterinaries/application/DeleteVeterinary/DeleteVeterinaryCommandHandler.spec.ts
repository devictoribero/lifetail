import { Test } from '@nestjs/testing';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import {
  VETERINARY_REPOSITORY,
  VeterinaryRepository,
} from '../../domain/repositories/VeterinaryRepository';
import { DeleteVeterinaryCommand } from './DeleteVeterinaryCommand';
import { DeleteVeterinaryCommandHandler } from './DeleteVeterinaryCommandHandler';
import { faker } from '@faker-js/faker';
import { VeterinaryNotFoundException } from '../../domain/exceptions/VeterinaryNotFoundException';
import { Veterinary } from '../../domain/entities/Veterinary';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

describe('DeleteVeterinaryCommandHandler', () => {
  let handler: DeleteVeterinaryCommandHandler;
  let repository: jest.Mocked<VeterinaryRepository>;

  beforeEach(async () => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
    } as jest.Mocked<VeterinaryRepository>;

    const module = await Test.createTestingModule({
      providers: [
        DeleteVeterinaryCommandHandler,
        { provide: VETERINARY_REPOSITORY, useValue: repository },
      ],
    }).compile();

    handler = module.get<DeleteVeterinaryCommandHandler>(DeleteVeterinaryCommandHandler);
  });

  it.only('should delete a veterinary when it exists', async () => {
    // Arrange
    const id = faker.string.uuid();
    const veterinary = Veterinary.create(new UUID(id), new StringValueObject('Test Veterinary'));
    repository.find.mockResolvedValue(veterinary);

    // Act
    const command = new DeleteVeterinaryCommand(id);
    await handler.handle(command);

    // Assert
    expect(repository.find).toHaveBeenCalledWith(expect.any(UUID));
    expect(repository.save).toHaveBeenCalledWith(expect.any(Veterinary));
    const savedVeterinary = repository.save.mock.calls[0][0] as Veterinary;
    expect(savedVeterinary.getId().toString()).toBe(id);
    expect(savedVeterinary.getDeletedAt()).not.toBeNull();
  });

  it('should throw VeterinaryNotFoundException when veterinary does not exist', async () => {
    // Arrange
    const id = faker.string.uuid();
    repository.find.mockResolvedValue(null);
    const command = new DeleteVeterinaryCommand(id);

    // Act & Assert
    await expect(handler.handle(command)).rejects.toThrow(VeterinaryNotFoundException);
    expect(repository.find).toHaveBeenCalledWith(expect.any(UUID));
    expect(repository.save).not.toHaveBeenCalled();
  });
});
