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

describe('UpdateVeterinaryCommandHandler', () => {
  let commandHandler: UpdateVeterinaryCommandHandler;
  let repository: jest.Mocked<VeterinaryRepository>;
  let mockVeterinary: Veterinary;
  let id: string;

  beforeEach(() => {
    id = faker.string.uuid();

    // Create mocked repository
    repository = {
      save: jest.fn(),
      find: jest.fn(),
    } as unknown as jest.Mocked<VeterinaryRepository>;

    // Create commandHandler manually (without NestJS)
    commandHandler = new UpdateVeterinaryCommandHandler(repository);

    // Create a mock veterinary that will be returned by the repository
    mockVeterinary = Veterinary.create(
      new UUID(id),
      new StringValueObject(faker.company.name()),
      new StringValueObject(faker.location.streetAddress()),
      new EmailValueObject(faker.internet.email()),
      new StringValueObject(faker.phone.number()),
      new StringValueObject(faker.phone.number()),
      new StringValueObject(faker.lorem.paragraph()),
    );

    // Setup repository.find to return our mock veterinary
    repository.find.mockResolvedValue(mockVeterinary);
  });

  it('should update veterinary name', async () => {
    // Arrange
    const newName = 'Updated Veterinary Name';
    const command = new UpdateVeterinaryCommand(id, newName);
    const renameSpy = jest.spyOn(mockVeterinary, 'rename');

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(repository.find).toHaveBeenCalledWith(new UUID(id));
    expect(renameSpy).toHaveBeenCalledWith(new StringValueObject(newName));
    expect(repository.save).toHaveBeenCalledWith(mockVeterinary);
  });

  it('should update only the veterinary address', async () => {
    // Arrange
    const newAddress = 'Updated Address';
    const command = new UpdateVeterinaryCommand(id, undefined, newAddress);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(repository.find).toHaveBeenCalledWith(new UUID(id));
    const savedVeterinary = repository.save.mock.calls[0][0] as Veterinary;
    expect(savedVeterinary.getId()).not.toBeNull();
    expect(savedVeterinary.getName().toString()).not.toBeNull();
    expect(savedVeterinary.getAddress().toString()).toBe(newAddress);
    expect(savedVeterinary.getEmail()).not.toBeNull();
    expect(savedVeterinary.getPrimaryPhone()).not.toBeNull();
    expect(savedVeterinary.getEmergencyPhone()).not.toBeNull();
    expect(savedVeterinary.getNotes()).not.toBeNull();
  });

  it('should update only the veterinary email', async () => {
    // Arrange
    const newEmail = 'updated@example.com';
    const command = new UpdateVeterinaryCommand(id, undefined, undefined, newEmail);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(repository.find).toHaveBeenCalledWith(new UUID(id));
    const savedVeterinary = repository.save.mock.calls[0][0] as Veterinary;
    expect(savedVeterinary.getId()).not.toBeNull();
    expect(savedVeterinary.getName().toString()).not.toBeNull();
    expect(savedVeterinary.getAddress().toString()).not.toBeNull();
    expect(savedVeterinary.getEmail().toString()).toBe(newEmail);
    expect(savedVeterinary.getPrimaryPhone().toString()).not.toBeNull();
    expect(savedVeterinary.getEmergencyPhone().toString()).not.toBeNull();
  });

  it('should update only the veterinary primary phone', async () => {
    // Arrange
    const newPhone = '555-123-4567';
    const command = new UpdateVeterinaryCommand(id, undefined, undefined, undefined, newPhone);

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(repository.find).toHaveBeenCalledWith(new UUID(id));
    const savedVeterinary = repository.save.mock.calls[0][0] as Veterinary;
    expect(savedVeterinary.getId()).not.toBeNull();
    expect(savedVeterinary.getName().toString()).not.toBeNull();
    expect(savedVeterinary.getAddress().toString()).not.toBeNull();
    expect(savedVeterinary.getEmail().toString()).not.toBeNull();
    expect(savedVeterinary.getPrimaryPhone().toString()).toBe(newPhone);
    expect(savedVeterinary.getEmergencyPhone().toString()).not.toBeNull();
  });

  it('should update only the veterinary emergency phone', async () => {
    // Arrange
    const newEmergencyPhone = '888-999-0000';
    const command = new UpdateVeterinaryCommand(
      id,
      undefined,
      undefined,
      undefined,
      undefined,
      newEmergencyPhone,
    );

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(repository.find).toHaveBeenCalledWith(new UUID(id));
    const savedVeterinary = repository.save.mock.calls[0][0] as Veterinary;
    expect(savedVeterinary.getId()).not.toBeNull();
    expect(savedVeterinary.getName().toString()).not.toBeNull();
    expect(savedVeterinary.getAddress().toString()).not.toBeNull();
    expect(savedVeterinary.getEmail().toString()).not.toBeNull();
    expect(savedVeterinary.getPrimaryPhone().toString()).not.toBeNull();
    expect(savedVeterinary.getEmergencyPhone().toString()).toBe(newEmergencyPhone);
  });

  it('should update only the veterinary notes', async () => {
    // Arrange
    const newNotes = 'Updated notes about this veterinary';
    const command = new UpdateVeterinaryCommand(
      id,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      newNotes,
    );

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(repository.find).toHaveBeenCalledWith(new UUID(id));
    const savedVeterinary = repository.save.mock.calls[0][0] as Veterinary;
    expect(savedVeterinary.getId()).not.toBeNull();
    expect(savedVeterinary.getName().toString()).not.toBeNull();
    expect(savedVeterinary.getAddress().toString()).not.toBeNull();
    expect(savedVeterinary.getEmail().toString()).not.toBeNull();
    expect(savedVeterinary.getPrimaryPhone().toString()).not.toBeNull();
  });

  it('should set fields to null when provided with empty values', async () => {
    // Arrange
    // Empty strings for fields should convert to null values
    const command = new UpdateVeterinaryCommand(id, undefined, '', '', '', '', '');

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(repository.find).toHaveBeenCalledWith(new UUID(id));
    const savedVeterinary = repository.save.mock.calls[0][0] as Veterinary;
    expect(savedVeterinary.getId()).not.toBeNull();
    expect(savedVeterinary.getName().toString()).not.toBeNull();
    expect(savedVeterinary.getAddress()).toBeNull();
    expect(savedVeterinary.getEmail()).toBeNull();
    expect(savedVeterinary.getPrimaryPhone()).toBeNull();
    expect(savedVeterinary.getEmergencyPhone()).toBeNull();
    expect(savedVeterinary.getNotes()).toBeNull();
  });

  it('should update multiple fields at once', async () => {
    // Arrange
    const command = new UpdateVeterinaryCommand(id, 'New Name', 'New Address', 'new@example.com');

    // Act
    await commandHandler.handle(command);

    // Assert
    expect(repository.save).toHaveBeenCalledTimes(1);
    const savedVeterinary = repository.save.mock.calls[0][0] as Veterinary;
    expect(savedVeterinary.getId()).not.toBeNull();
    expect(savedVeterinary.getName().toString()).toBe('New Name');
    expect(savedVeterinary.getAddress().toString()).toBe('New Address');
    expect(savedVeterinary.getEmail().toString()).toBe('new@example.com');
    expect(savedVeterinary.getPrimaryPhone().toString()).not.toBeNull();
    expect(savedVeterinary.getEmergencyPhone().toString()).not.toBeNull();
  });

  it('should throw VeterinaryNotFoundException when veterinary does not exist', async () => {
    // Arrange
    repository.find.mockResolvedValue(null);
    const command = new UpdateVeterinaryCommand(id, 'New Name');

    // Act & Assert
    await expect(commandHandler.handle(command)).rejects.toThrow(VeterinaryNotFoundException);
    expect(repository.find).toHaveBeenCalledWith(new UUID(id));
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('should throw VeterinaryNameTooShortException when name is too short', async () => {
    // Arrange
    const tooShortName = 'AB';
    const command = new UpdateVeterinaryCommand(id, tooShortName);

    // Act & Assert
    await expect(commandHandler.handle(command)).rejects.toThrow(VeterinaryNameTooShortException);
    expect(repository.find).toHaveBeenCalledWith(new UUID(id));
    expect(repository.save).not.toHaveBeenCalled();
  });
});
