import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { Veterinary } from '../../domain/entities/Veterinary';
import { VeterinaryRepository } from '../../domain/repositories/VeterinaryRepository';
import { AddVeterinaryCommand } from './AddVeterinaryCommand';
import { AddVeterinaryCommandHandler } from './AddVeterinaryCommandHandler';
import { faker } from '@faker-js/faker';
import { VeterinaryInMemoryRepository } from '../../infrastructure/VeterinaryInMemoryRepository';
import { VeterinaryObjectMother } from '../../domain/entities/VeterinaryObjectMother.spec';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

describe('AddVeterinaryCommandHandler', () => {
  let handler: AddVeterinaryCommandHandler;
  let repository: jest.Mocked<VeterinaryRepository>;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
    } as unknown as jest.Mocked<VeterinaryRepository>;
    handler = new AddVeterinaryCommandHandler(repository);
  });

  it('should save a veterinary', async () => {
    // Given
    const veterinary = VeterinaryObjectMother.create();
    const id = veterinary.getId().toString();
    const name = veterinary.getName().toString();
    const command = new AddVeterinaryCommand(id, name);
    const saveSpy = jest.spyOn(repository, 'save');

    // When
    await handler.handle(command);

    // Then
    expect(saveSpy).toHaveBeenCalledWith({
      id: new UUID(id),
      name: new StringValueObject(name),
      address: null,
      email: null,
      primaryPhone: null,
      emergencyPhone: null,
      notes: null,
      createdAt: expect.any(DateValueObject),
      updatedAt: null,
      deletedAt: null,
      domainEvents: [],
    });
  });
});
