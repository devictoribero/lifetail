import { UUID } from 'src/contexts/Shared/domain/UUID';
import { VeterinaryRepository } from '../../domain/repositories/VeterinaryRepository';
import { DeleteVeterinaryCommand } from './DeleteVeterinaryCommand';
import { DeleteVeterinaryCommandHandler } from './DeleteVeterinaryCommandHandler';
import { faker } from '@faker-js/faker';
import { VeterinaryNotFoundException } from '../../domain/exceptions/VeterinaryNotFoundException';
import { Veterinary } from '../../domain/entities/Veterinary';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { VeterinaryInMemoryRepository } from '../../infrastructure/VeterinaryInMemoryRepository';

describe('DeleteVeterinaryCommandHandler', () => {
  let handler: DeleteVeterinaryCommandHandler;
  let repository: VeterinaryRepository;

  beforeEach(() => {
    repository = new VeterinaryInMemoryRepository();
    handler = new DeleteVeterinaryCommandHandler(repository);
  });

  it('should throw VeterinaryNotFoundException when veterinary does not exist', async () => {
    // Given
    const id = faker.string.uuid();
    const command = new DeleteVeterinaryCommand(id);

    // When/Then
    await expect(handler.handle(command)).rejects.toThrow(VeterinaryNotFoundException);
  });

  it('should set fields to null when provided with empty values', async () => {
    // TODO: Implement this test
  });

  // Happy paths
  it('should delete a veterinary when it exists', async () => {
    // Given
    const id = faker.string.uuid();
    const veterinary = Veterinary.create({
      id: new UUID(id),
      name: new StringValueObject('Test Veterinary'),
    });
    await repository.save(veterinary);
    const command = new DeleteVeterinaryCommand(id);

    // When
    await handler.handle(command);

    // Then
    const deletedVeterinary = await repository.find(new UUID(id));
    expect(deletedVeterinary).not.toBeNull();
    expect(deletedVeterinary?.getId().toString()).toBe(id);
    expect(deletedVeterinary?.getDeletedAt()).not.toBeNull();
  });
});
