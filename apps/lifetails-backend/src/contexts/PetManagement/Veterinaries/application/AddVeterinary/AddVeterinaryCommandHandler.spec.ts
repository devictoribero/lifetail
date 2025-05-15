import { Test } from '@nestjs/testing';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { Veterinary } from '../../domain/entities/Veterinary';
import {
  VETERINARY_REPOSITORY,
  VeterinaryRepository,
} from '../../domain/repositories/VeterinaryRepository';
import { AddVeterinaryCommand } from './AddVeterinaryCommand';
import { AddVeterinaryCommandHandler } from './AddVeterinaryCommandHandler';
import { faker } from '@faker-js/faker';

describe('AddVeterinaryCommandHandler', () => {
  let handler: AddVeterinaryCommandHandler;
  let repository: jest.Mocked<VeterinaryRepository>;

  beforeEach(async () => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
      remove: jest.fn(),
      findByOwner: jest.fn(),
    } as jest.Mocked<VeterinaryRepository>;

    const module = await Test.createTestingModule({
      providers: [
        AddVeterinaryCommandHandler,
        { provide: VETERINARY_REPOSITORY, useValue: repository },
      ],
    }).compile();

    handler = module.get<AddVeterinaryCommandHandler>(AddVeterinaryCommandHandler);
  });

  it('should save a veterinary', async () => {
    // Arrange
    const saveSpy = jest.spyOn(repository, 'save');
    const id = faker.string.uuid();
    const name = faker.company.name();
    const command = new AddVeterinaryCommand(id, name);

    // Act
    await handler.handle(command);

    // Assert
    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        getId: expect.any(Function),
        getName: expect.any(Function),
      }),
    );
    const savedVeterinary = saveSpy.mock.calls[0][0] as Veterinary;
    expect(savedVeterinary.getId().toString()).toBe(id);
    expect(savedVeterinary.getName().toString()).toBe(name);
  });
});
