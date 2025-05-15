import { Veterinary } from './Veterinary';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { VeterinaryNameTooShortException } from '../exceptions/VeterinaryNameTooShortException';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { faker } from '@faker-js/faker';

describe('Veterinary', () => {
  it('can create the most basic instance of Veterinary using the named constructor', () => {
    const id = UUID.create();
    const name = new StringValueObject('Animal Hospital');

    const veterinary = Veterinary.create(id, name);

    expect(veterinary.getId()).toBe(id);
    expect(veterinary.getName()).toBe(name);
    expect(veterinary.getAddress()).toBeNull();
    expect(veterinary.getEmail()).toBeNull();
    expect(veterinary.getPrimaryPhone()).toBeNull();
    expect(veterinary.getEmergencyPhone()).toBeNull();
    expect(veterinary.getNotes()).toBeNull();
  });

  it('can create an instance of Veterinary using the named constructor', () => {
    const id = UUID.create().toString();
    const name = faker.company.name();
    const address = faker.location.streetAddress();
    const email = faker.internet.email();
    const primaryPhone = faker.phone.number();
    const emergencyPhone = faker.phone.number();
    const notes = faker.lorem.paragraph();

    const veterinary = Veterinary.create(
      new UUID(id),
      new StringValueObject(name),
      new StringValueObject(address),
      new EmailValueObject(email),
      new StringValueObject(primaryPhone),
      new StringValueObject(emergencyPhone),
      new StringValueObject(notes),
    );

    expect(veterinary.getId().toString()).toBe(id);
    expect(veterinary.getName().toString()).toBe(name);
    expect(veterinary.getAddress()?.toString()).toBe(address);
    expect(veterinary.getEmail()?.toString()).toBe(email);
    expect(veterinary.getPrimaryPhone()?.toString()).toBe(primaryPhone);
    expect(veterinary.getEmergencyPhone()?.toString()).toBe(emergencyPhone);
    expect(veterinary.getNotes()?.toString()).toBe(notes);
  });

  it('should throw VeterinaryNameTooShortException when name has less than too short', () => {
    const id = UUID.create();
    const tooShortName = new StringValueObject('AB');

    expect(() => {
      Veterinary.create(id, tooShortName);
    }).toThrow(VeterinaryNameTooShortException);

    const veterinary = Veterinary.create(id, new StringValueObject('Font Blanca veterinary'));

    expect(veterinary.getName().toString()).toBe('Font Blanca veterinary');

    expect(() => {
      veterinary.rename(tooShortName);
    }).toThrow(VeterinaryNameTooShortException);
  });

  it('can create a new instance of Veterinary using the fromPrimitives method', () => {
    const id = UUID.create();
    const name = faker.company.name();
    const address = faker.location.streetAddress();
    const email = faker.internet.email();
    const primaryPhone = faker.phone.number();
    const emergencyPhone = faker.phone.number();
    const notes = faker.lorem.paragraph();

    const veterinary = Veterinary.fromPrimitives(
      id.toString(),
      name,
      address,
      email,
      primaryPhone,
      emergencyPhone,
      notes,
      new Date(),
      null,
    );

    expect(veterinary.getId().toString()).toBe(id.toString());
    expect(veterinary.getName().toString()).toBe(name);
    expect(veterinary.getAddress()?.toString()).toBe(address);
    expect(veterinary.getEmail()?.toString()).toBe(email);
    expect(veterinary.getPrimaryPhone()?.toString()).toBe(primaryPhone);
    expect(veterinary.getEmergencyPhone()?.toString()).toBe(emergencyPhone);
    expect(veterinary.getNotes()?.toString()).toBe(notes);
  });

  it('can serialize the most basic Veterinary instance to a primitive object', () => {
    const id = UUID.create();
    const name = faker.company.name();

    const veterinary = Veterinary.create(id, new StringValueObject(name));

    expect(veterinary.toPrimitives()).toEqual({
      id: id.toString(),
      name: name,
      address: null,
      email: null,
      primaryPhone: null,
      emergencyPhone: null,
      notes: null,
      createdAt: expect.any(String),
      updatedAt: null,
    });
  });

  it('can serialize a Veterinary instance with all fields to a primitive object', () => {
    const id = UUID.create();
    const name = faker.company.name();
    const address = faker.location.streetAddress();
    const email = faker.internet.email();
    const primaryPhone = faker.phone.number();
    const emergencyPhone = faker.phone.number();
    const notes = faker.lorem.paragraph();

    const veterinary = Veterinary.create(
      id,
      new StringValueObject(name),
      new StringValueObject(address),
      new EmailValueObject(email),
      new StringValueObject(primaryPhone),
      new StringValueObject(emergencyPhone),
      new StringValueObject(notes),
    );

    expect(veterinary.toPrimitives()).toEqual({
      id: id.toString(),
      name: name,
      address: address,
      email: email,
      primaryPhone: primaryPhone,
      emergencyPhone: emergencyPhone,
      notes: notes,
      createdAt: expect.any(String),
      updatedAt: null,
    });
  });

  it('can rename a veterinary', () => {
    const id = UUID.create();
    const name = faker.company.name();
    const newName = faker.company.name();

    const veterinary = Veterinary.create(id, new StringValueObject(name));

    veterinary.rename(new StringValueObject(newName));

    expect(veterinary.getName().toString()).toBe(newName);
    expect(veterinary.getUpdatedAt()).not.toBeNull();
  });

  it('can relocate a veterinary', () => {
    const id = UUID.create();
    const name = faker.company.name();
    const newAddress = faker.location.streetAddress();
    const veterinary = Veterinary.create(id, new StringValueObject(name));

    expect(veterinary.getUpdatedAt()).toBeNull();
    veterinary.relocate(new StringValueObject(newAddress));

    expect(veterinary.getAddress()?.toString()).toBe(newAddress);
    expect(veterinary.getUpdatedAt()).not.toBeNull();
  });

  it('can change the contact email of a veterinary', () => {
    const id = UUID.create();
    const name = faker.company.name();
    const newEmail = faker.internet.email();

    const veterinary = Veterinary.create(id, new StringValueObject(name));

    veterinary.changeContactEmail(new EmailValueObject(newEmail));

    expect(veterinary.getEmail()?.toString()).toBe(newEmail);
    expect(veterinary.getUpdatedAt()).not.toBeNull();
  });

  it('can add a primary phone to a veterinary', () => {
    const id = UUID.create();
    const name = faker.company.name();
    const newPrimaryPhone = faker.phone.number();

    const veterinary = Veterinary.create(id, new StringValueObject(name));

    veterinary.addPrimaryPhone(new StringValueObject(newPrimaryPhone));

    expect(veterinary.getPrimaryPhone()?.toString()).toBe(newPrimaryPhone);
    expect(veterinary.getUpdatedAt()).not.toBeNull();
  });

  it('can add an emergency phone to a veterinary', () => {
    const id = UUID.create();
    const name = faker.company.name();
    const newEmergencyPhone = faker.phone.number();

    const veterinary = Veterinary.create(id, new StringValueObject(name));

    veterinary.addEmergencyPhone(new StringValueObject(newEmergencyPhone));

    expect(veterinary.getEmergencyPhone()?.toString()).toBe(newEmergencyPhone);
    expect(veterinary.getUpdatedAt()).not.toBeNull();
  });

  it('can add additional information to a veterinary', () => {
    const id = UUID.create();
    const name = faker.company.name();
    const newAdditionalInfo = faker.lorem.paragraph();

    const veterinary = Veterinary.create(id, new StringValueObject(name));

    veterinary.documentAdditionalInfo(new StringValueObject(newAdditionalInfo));

    expect(veterinary.getNotes()?.toString()).toBe(newAdditionalInfo);
    expect(veterinary.getUpdatedAt()).not.toBeNull();
  });
});
