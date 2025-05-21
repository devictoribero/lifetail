import { Veterinary } from './Veterinary';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { VeterinaryNameTooShortException } from '../exceptions/VeterinaryNameTooShortException';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { faker } from '@faker-js/faker';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { VeterinaryObjectMother } from './VeterinaryObjectMother.spec';

describe('Veterinary', () => {
  describe('Validation', () => {
    it('should throw VeterinaryNameTooShortException when name has less than 3 characters', () => {
      const id = UUID.generate();
      const tooShortName = new StringValueObject('AB');

      expect(() => {
        VeterinaryObjectMother.createWith({ id, name: tooShortName });
      }).toThrow(VeterinaryNameTooShortException);
    });
  });

  describe('Creation', () => {
    it('can create a Veterinary instance using the create named constructor', () => {
      const id = UUID.generate();
      const name = new StringValueObject('Animal Hospital');
      const address = new StringValueObject('123 Main St');
      const email = new EmailValueObject('info@animalhospital.com');
      const primaryPhone = new StringValueObject('123-456-7890');
      const emergencyPhone = new StringValueObject('987-654-3210');
      const notes = new StringValueObject('Additional information');
      const veterinary = Veterinary.create({
        id,
        name,
        address,
        email,
        primaryPhone,
        emergencyPhone,
        notes,
      });

      expect(veterinary.getId().equals(id)).toBe(true);
      expect(veterinary.getName().equals(name)).toBe(true);
      expect(veterinary.getAddress()?.equals(address)).toBe(true);
      expect(veterinary.getEmail()?.equals(email)).toBe(true);
      expect(veterinary.getPrimaryPhone()?.equals(primaryPhone)).toBe(true);
      expect(veterinary.getEmergencyPhone()?.equals(emergencyPhone)).toBe(true);
      expect(veterinary.getNotes()?.equals(notes)).toBe(true);
      expect(veterinary.getCreatedAt()).toBeInstanceOf(DateValueObject);
      expect(veterinary.getUpdatedAt()).toBeNull();
      expect(veterinary.getDeletedAt()).toBeNull();
      const events = veterinary.pullDomainEvents();
      expect(events).toHaveLength(0);
    });
  });

  describe('Serialization', () => {
    it('can serialize to a primitives a Veterinary instance', () => {
      const id = UUID.generate();
      const name = faker.company.name();
      const address = faker.location.streetAddress();
      const email = faker.internet.email();
      const primaryPhone = faker.phone.number();
      const emergencyPhone = faker.phone.number();
      const notes = faker.lorem.paragraph();

      const veterinary = Veterinary.create({
        id,
        name: new StringValueObject(name),
        address: new StringValueObject(address),
        email: new EmailValueObject(email),
        primaryPhone: new StringValueObject(primaryPhone),
        emergencyPhone: new StringValueObject(emergencyPhone),
        notes: new StringValueObject(notes),
      });

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
        deletedAt: null,
      });
    });

    it('can unserialize from primitives a Veterinary instance', () => {
      const id = UUID.generate();
      const name = faker.company.name();
      const address = faker.location.streetAddress();
      const email = faker.internet.email();
      const primaryPhone = faker.phone.number();
      const emergencyPhone = faker.phone.number();
      const notes = faker.lorem.paragraph();
      const createdAt = new Date('01/01/2025');
      const updatedAt = new Date('02/02/2025');
      const deletedAt = new Date('03/03/2025');

      const veterinary = VeterinaryObjectMother.fromPrimitives({
        id: id.toString(),
        name,
        address,
        email,
        primaryPhone,
        emergencyPhone,
        notes,
        createdAt,
        updatedAt,
        deletedAt,
      });

      expect(veterinary.getId().equals(id)).toBe(true);
      expect(veterinary.getName().equals(new StringValueObject(name))).toBe(true);
      expect(veterinary.getAddress()?.equals(new StringValueObject(address))).toBe(true);
      expect(veterinary.getEmail()?.equals(new EmailValueObject(email))).toBe(true);
      expect(veterinary.getPrimaryPhone()?.equals(new StringValueObject(primaryPhone))).toBe(true);
      expect(veterinary.getEmergencyPhone()?.equals(new StringValueObject(emergencyPhone))).toBe(
        true,
      );
      expect(veterinary.getNotes()?.equals(new StringValueObject(notes))).toBe(true);
      expect(veterinary.getCreatedAt().equals(new DateValueObject(createdAt))).toBe(true);
      expect(veterinary.getUpdatedAt()?.equals(new DateValueObject(updatedAt))).toBe(true);
      expect(veterinary.getDeletedAt()?.equals(new DateValueObject(deletedAt))).toBe(true);
    });
  });

  describe('Interaction', () => {
    it('can rename a veterinary', () => {
      const id = UUID.generate();
      const name = faker.company.name();
      const newName = faker.company.name();

      const veterinary = VeterinaryObjectMother.createWith({
        id,
        name: new StringValueObject(name),
      });

      const newNameValueObject = new StringValueObject(newName);
      veterinary.rename(newNameValueObject);

      expect(veterinary.getName().equals(newNameValueObject)).toBe(true);
      expect(veterinary.getUpdatedAt()).not.toBeNull();
    });

    it('can relocate a veterinary', () => {
      const id = UUID.generate();
      const name = faker.company.name();
      const newAddress = faker.location.streetAddress();
      const veterinary = VeterinaryObjectMother.createWith({
        id,
        name: new StringValueObject(name),
      });
      expect(veterinary.getUpdatedAt()).toBeNull();

      const newLocation = new StringValueObject(newAddress);
      veterinary.relocate(newLocation);

      expect(veterinary.getAddress()?.equals(newLocation)).toBe(true);
      expect(veterinary.getUpdatedAt()).not.toBeNull();
    });

    it('can change the contact email of a veterinary', () => {
      const id = UUID.generate();
      const name = faker.company.name();
      const newEmail = faker.internet.email();

      const veterinary = VeterinaryObjectMother.createWith({
        id,
        name: new StringValueObject(name),
      });

      const newEmailValueObject = new EmailValueObject(newEmail);
      veterinary.changeContactEmail(newEmailValueObject);

      expect(veterinary.getEmail()?.equals(newEmailValueObject)).toBe(true);
      expect(veterinary.getUpdatedAt()).not.toBeNull();
    });

    it('can add a primary phone to a veterinary', () => {
      const id = UUID.generate();
      const name = faker.company.name();
      const newPrimaryPhone = faker.phone.number();

      const veterinary = VeterinaryObjectMother.createWith({
        id,
        name: new StringValueObject(name),
      });

      const newPrimaryPhoneValueObject = new StringValueObject(newPrimaryPhone);
      veterinary.addPrimaryPhone(newPrimaryPhoneValueObject);

      expect(veterinary.getPrimaryPhone()?.equals(newPrimaryPhoneValueObject)).toBe(true);
      expect(veterinary.getUpdatedAt()).not.toBeNull();
    });

    it('can add an emergency phone to a veterinary', () => {
      const id = UUID.generate();
      const name = faker.company.name();
      const newEmergencyPhone = faker.phone.number();

      const veterinary = VeterinaryObjectMother.createWith({
        id,
        name: new StringValueObject(name),
      });

      const newEmergencyPhoneValueObject = new StringValueObject(newEmergencyPhone);
      veterinary.addEmergencyPhone(newEmergencyPhoneValueObject);

      expect(veterinary.getEmergencyPhone()?.equals(newEmergencyPhoneValueObject)).toBe(true);
      expect(veterinary.getUpdatedAt()).not.toBeNull();
    });

    it('can add additional information to a veterinary', () => {
      const id = UUID.generate();
      const name = faker.company.name();
      const newAdditionalInfo = faker.lorem.paragraph();

      const veterinary = VeterinaryObjectMother.createWith({
        id,
        name: new StringValueObject(name),
      });

      const newAdditionalInfoValueObject = new StringValueObject(newAdditionalInfo);
      veterinary.documentAdditionalInfo(newAdditionalInfoValueObject);

      expect(veterinary.getNotes()?.equals(newAdditionalInfoValueObject)).toBe(true);
      expect(veterinary.getUpdatedAt()).not.toBeNull();
    });

    it('can mark a veterinary as deleted', () => {
      const id = UUID.generate();
      const name = faker.company.name();
      const veterinary = VeterinaryObjectMother.createWith({
        id,
        name: new StringValueObject(name),
      });

      veterinary.markAsDeleted();

      expect(veterinary.getDeletedAt()).not.toBeNull();
    });
  });
});
