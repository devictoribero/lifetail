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

describe('UpdateVeterinaryCommandHandler', () => {
  let commandHandler: UpdateVeterinaryCommandHandler;
  let repository: VeterinaryRepository;
  let veterinary: Veterinary;
  let id: string;

  beforeEach(() => {
    repository = new VeterinaryInMemoryRepository();
    commandHandler = new UpdateVeterinaryCommandHandler(repository);

    // Create a test veterinary
    id = faker.string.uuid();
    veterinary = Veterinary.create({
      id: new UUID(id),
      name: new StringValueObject(faker.company.name()),
      address: new StringValueObject(faker.location.streetAddress()),
      email: new EmailValueObject(faker.internet.email()),
      primaryPhone: new StringValueObject(faker.phone.number()),
      emergencyPhone: new StringValueObject(faker.phone.number()),
      notes: new StringValueObject(faker.lorem.paragraph()),
    });

    // Save it to the repository
    repository.save(veterinary);
  });

  it('should throw VeterinaryNotFoundException when veterinary does not exist', async () => {
    // Given
    const nonExistentId = faker.string.uuid();
    const command = new UpdateVeterinaryCommand(nonExistentId, 'New Name');

    // When/Then
    await expect(commandHandler.handle(command)).rejects.toThrow(VeterinaryNotFoundException);
  });

  it('should throw VeterinaryNameTooShortException when name is too short', async () => {
    // Given
    const tooShortName = 'AB';
    const command = new UpdateVeterinaryCommand(id, tooShortName);

    // When/Then
    await expect(commandHandler.handle(command)).rejects.toThrow(VeterinaryNameTooShortException);

    // Verify the veterinary was not changed
    const unchangedVeterinary = await repository.find(new UUID(id));
    expect(unchangedVeterinary?.getName().toString()).toBe(veterinary.getName().toString());
  });

  it('should set fields to null when provided with empty values', async () => {
    // Given
    // Empty strings for fields should convert to null values
    const command = new UpdateVeterinaryCommand(id, undefined, '', '', '', '', '');

    // When
    await commandHandler.handle(command);

    // Then
    const updatedVeterinary = await repository.find(new UUID(id));
    expect(updatedVeterinary).not.toBeNull();
    expect(updatedVeterinary?.getAddress()).toBeNull();
    expect(updatedVeterinary?.getEmail()).toBeNull();
    expect(updatedVeterinary?.getPrimaryPhone()).toBeNull();
    expect(updatedVeterinary?.getEmergencyPhone()).toBeNull();
    expect(updatedVeterinary?.getNotes()).toBeNull();
  });

  it('should update veterinary name', async () => {
    // Given
    const newName = 'Updated Veterinary Name';
    const command = new UpdateVeterinaryCommand(id, newName);

    // When
    await commandHandler.handle(command);

    // Then
    const updatedVeterinary = await repository.find(new UUID(id));
    expect(updatedVeterinary).not.toBeNull();
    expect(updatedVeterinary?.getName().toString()).toBe(newName);
  });

  it('should update only the veterinary address', async () => {
    // Given
    const newAddress = 'Updated Address';
    const command = new UpdateVeterinaryCommand(id, undefined, newAddress);

    // When
    await commandHandler.handle(command);

    // Then
    const updatedVeterinary = await repository.find(new UUID(id));
    expect(updatedVeterinary).not.toBeNull();
    expect(updatedVeterinary?.getAddress()?.toString()).toBe(newAddress);

    // Other fields should remain unchanged
    expect(updatedVeterinary?.getName().toString()).toBe(veterinary.getName().toString());
    expect(updatedVeterinary?.getEmail()?.toString()).toBe(veterinary.getEmail()?.toString());
    expect(updatedVeterinary?.getPrimaryPhone()?.toString()).toBe(
      veterinary.getPrimaryPhone()?.toString(),
    );
    expect(updatedVeterinary?.getEmergencyPhone()?.toString()).toBe(
      veterinary.getEmergencyPhone()?.toString(),
    );
    expect(updatedVeterinary?.getNotes()?.toString()).toBe(veterinary.getNotes()?.toString());
  });

  it('should update only the veterinary email', async () => {
    // Given
    const newEmail = 'updated@example.com';
    const command = new UpdateVeterinaryCommand(id, undefined, undefined, newEmail);

    // When
    await commandHandler.handle(command);

    // Then
    const updatedVeterinary = await repository.find(new UUID(id));
    expect(updatedVeterinary).not.toBeNull();
    expect(updatedVeterinary?.getEmail()?.toString()).toBe(newEmail);

    // Other fields should remain unchanged
    expect(updatedVeterinary?.getName().toString()).toBe(veterinary.getName().toString());
    expect(updatedVeterinary?.getAddress()?.toString()).toBe(veterinary.getAddress()?.toString());
  });

  it('should update only the veterinary primary phone', async () => {
    // Given
    const newPhone = '555-123-4567';
    const command = new UpdateVeterinaryCommand(id, undefined, undefined, undefined, newPhone);

    // When
    await commandHandler.handle(command);

    // Then
    const updatedVeterinary = await repository.find(new UUID(id));
    expect(updatedVeterinary).not.toBeNull();
    expect(updatedVeterinary?.getPrimaryPhone()?.toString()).toBe(newPhone);
  });

  it('should update only the veterinary emergency phone', async () => {
    // Given
    const newEmergencyPhone = '888-999-0000';
    const command = new UpdateVeterinaryCommand(
      id,
      undefined,
      undefined,
      undefined,
      undefined,
      newEmergencyPhone,
    );

    // When
    await commandHandler.handle(command);

    // Then
    const updatedVeterinary = await repository.find(new UUID(id));
    expect(updatedVeterinary).not.toBeNull();
    expect(updatedVeterinary?.getEmergencyPhone()?.toString()).toBe(newEmergencyPhone);
  });

  it('should update only the veterinary notes', async () => {
    // Given
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

    // When
    await commandHandler.handle(command);

    // Then
    const updatedVeterinary = await repository.find(new UUID(id));
    expect(updatedVeterinary).not.toBeNull();
    expect(updatedVeterinary?.getNotes()?.toString()).toBe(newNotes);
  });

  it('should update multiple fields at once', async () => {
    // Given
    const command = new UpdateVeterinaryCommand(id, 'New Name', 'New Address', 'new@example.com');

    // When
    await commandHandler.handle(command);

    // Then
    const updatedVeterinary = await repository.find(new UUID(id));
    expect(updatedVeterinary).not.toBeNull();
    expect(updatedVeterinary?.getName().toString()).toBe('New Name');
    expect(updatedVeterinary?.getAddress()?.toString()).toBe('New Address');
    expect(updatedVeterinary?.getEmail()?.toString()).toBe('new@example.com');
  });
});
