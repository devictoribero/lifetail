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

  it('should delete a veterinary when it exists', async () => {
    // Arrange
    const id = faker.string.uuid();
    const mockVeterinary = {} as Veterinary;
    repository.find.mockResolvedValue(mockVeterinary);
    const command = new DeleteVeterinaryCommand(id);

    // Act
    await handler.handle(command);

    // Assert
    expect(repository.find).toHaveBeenCalledWith(expect.any(UUID));
    expect(repository.remove).toHaveBeenCalledWith(expect.any(UUID));
    const uuidArg = repository.remove.mock.calls[0][0] as UUID;
    expect(uuidArg.toString()).toBe(id);
  });

  it('should throw VeterinaryNotFoundException when veterinary does not exist', async () => {
    // Arrange
    const id = faker.string.uuid();
    repository.find.mockResolvedValue(null);
    const command = new DeleteVeterinaryCommand(id);

    // Act & Assert
    await expect(handler.handle(command)).rejects.toThrow(VeterinaryNotFoundException);
    expect(repository.find).toHaveBeenCalledWith(expect.any(UUID));
    expect(repository.remove).not.toHaveBeenCalled();
  });
});
