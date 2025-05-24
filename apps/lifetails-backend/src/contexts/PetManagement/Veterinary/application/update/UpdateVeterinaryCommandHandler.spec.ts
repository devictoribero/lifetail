import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { Veterinary } from '../../domain/entities/Veterinary';
import { VeterinaryRepository } from '../../domain/repositories/VeterinaryRepository';
import { UpdateVeterinaryCommand } from './UpdateVeterinaryCommand';
import { UpdateVeterinaryCommandHandler } from './UpdateVeterinaryCommandHandler';
import { VeterinaryNotFoundException } from '../../domain/exceptions/VeterinaryNotFoundException';
import { VeterinaryNameTooShortException } from '../../domain/exceptions/VeterinaryNameTooShortException';
import { faker } from '@faker-js/faker';
import { VeterinaryInMemoryRepository } from '../../infrastructure/VeterinaryInMemoryRepository';
import { VeterinaryObjectMother } from '../../domain/entities/VeterinaryObjectMother.spec';

describe('UpdateVeterinaryCommandHandler', () => {
  let commandHandler: UpdateVeterinaryCommandHandler;
  let repository: jest.Mocked<VeterinaryRepository>;
  let veterinary: Veterinary;
  let id: string;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
      find: jest.fn(),
    } as unknown as jest.Mocked<VeterinaryRepository>;
    commandHandler = new UpdateVeterinaryCommandHandler(repository);
  });

  it('should throw VeterinaryNotFoundException when veterinary does not exist', async () => {
    // Given
    const veterinary = VeterinaryObjectMother.create();
    const command = new UpdateVeterinaryCommand(veterinary.getId().toString(), 'New Name');
    repository.find.mockResolvedValue(null);
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    // Act / Assert
    await expect(commandHandler.handle(command)).rejects.toThrow(VeterinaryNotFoundException);
    expect(findSpy).toHaveBeenCalledWith(veterinary.getId());
    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('should throw VeterinaryNameTooShortException when name is too short', async () => {
    // Given
    const veterinary = VeterinaryObjectMother.create();
    const command = new UpdateVeterinaryCommand(veterinary.getId().toString(), 'AB');
    repository.find.mockResolvedValue(veterinary);
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    // Act / Assert
    await expect(commandHandler.handle(command)).rejects.toThrow(VeterinaryNameTooShortException);
    expect(findSpy).toHaveBeenCalledWith(veterinary.getId());
    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('should rename veterinary', async () => {
    // Given
    const veterinary = VeterinaryObjectMother.create();
    const id = veterinary.getId().toString();
    const newName = faker.company.name();
    const command = new UpdateVeterinaryCommand(id, newName);
    repository.find.mockResolvedValue(veterinary);
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    // When
    await commandHandler.handle(command);

    // Then
    expect(findSpy).toHaveBeenCalledWith(veterinary.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...veterinary,
      name: new StringValueObject(newName),
    });
  });

  it('should relocate veterinary', async () => {
    // Given
    const veterinary = VeterinaryObjectMother.create();
    const id = veterinary.getId().toString();
    const newAddress = faker.location.streetAddress();
    const command = new UpdateVeterinaryCommand(id, undefined, newAddress);
    repository.find.mockResolvedValue(veterinary);
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    // When
    await commandHandler.handle(command);

    // Then
    expect(findSpy).toHaveBeenCalledWith(veterinary.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...veterinary,
      address: new StringValueObject(newAddress),
    });
  });

  it('should change veterinary email', async () => {
    // Given
    const veterinary = VeterinaryObjectMother.create();
    const id = veterinary.getId().toString();
    const newEmail = faker.internet.email();
    const command = new UpdateVeterinaryCommand(id, undefined, undefined, newEmail);
    repository.find.mockResolvedValue(veterinary);
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    // When
    await commandHandler.handle(command);

    // Then
    expect(findSpy).toHaveBeenCalledWith(veterinary.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...veterinary,
      email: new EmailValueObject(newEmail),
    });
  });

  it('should change veterinary primary phone', async () => {
    // Given
    const veterinary = VeterinaryObjectMother.create();
    const id = veterinary.getId().toString();
    const newPhone = faker.phone.number();
    const command = new UpdateVeterinaryCommand(id, undefined, undefined, undefined, newPhone);
    repository.find.mockResolvedValue(veterinary);
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    // When
    await commandHandler.handle(command);

    // Then
    expect(findSpy).toHaveBeenCalledWith(veterinary.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...veterinary,
      primaryPhone: new StringValueObject(newPhone),
    });
  });

  it('should change veterinary emergency phone', async () => {
    // Given
    const veterinary = VeterinaryObjectMother.create();
    const id = veterinary.getId().toString();
    const newEmergencyPhone = faker.phone.number();
    const command = new UpdateVeterinaryCommand(
      id,
      undefined,
      undefined,
      undefined,
      undefined,
      newEmergencyPhone,
    );
    repository.find.mockResolvedValue(veterinary);
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    // When
    await commandHandler.handle(command);

    // Then
    expect(findSpy).toHaveBeenCalledWith(veterinary.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...veterinary,
      emergencyPhone: new StringValueObject(newEmergencyPhone),
    });
  });

  it('should document additional info', async () => {
    // Given
    const veterinary = VeterinaryObjectMother.create();
    const id = veterinary.getId().toString();
    const newNotes = faker.lorem.paragraph();
    const command = new UpdateVeterinaryCommand(
      id,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      newNotes,
    );
    repository.find.mockResolvedValue(veterinary);
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    // When
    await commandHandler.handle(command);

    // Then
    expect(findSpy).toHaveBeenCalledWith(veterinary.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...veterinary,
      notes: new StringValueObject(newNotes),
    });
  });

  it('should update multiple fields at once', async () => {
    // Given
    const veterinary = VeterinaryObjectMother.create();
    const id = veterinary.getId().toString();
    const newName = faker.company.name();
    const newAddress = faker.location.streetAddress();
    const newEmail = faker.internet.email();
    const command = new UpdateVeterinaryCommand(id, newName, newAddress, newEmail);
    repository.find.mockResolvedValue(veterinary);
    const findSpy = jest.spyOn(repository, 'find');
    const saveSpy = jest.spyOn(repository, 'save');

    // When
    await commandHandler.handle(command);

    // Then
    expect(findSpy).toHaveBeenCalledWith(veterinary.getId());
    expect(saveSpy).toHaveBeenCalledWith({
      ...veterinary,
      name: new StringValueObject(newName),
      address: new StringValueObject(newAddress),
      email: new EmailValueObject(newEmail),
    });
  });
});
