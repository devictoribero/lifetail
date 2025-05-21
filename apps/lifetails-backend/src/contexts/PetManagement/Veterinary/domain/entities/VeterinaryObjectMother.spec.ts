import { faker } from '@faker-js/faker';
import { Veterinary } from './Veterinary';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';

export class VeterinaryObjectMother {
  static create({
    name = new StringValueObject(faker.company.name()),
    address = new StringValueObject(faker.location.streetAddress()),
    email = new EmailValueObject(faker.internet.email()),
    primaryPhone = new StringValueObject(faker.phone.number()),
    emergencyPhone = new StringValueObject(faker.phone.number()),
    notes = new StringValueObject(faker.lorem.sentence()),
  }: {
    name?: StringValueObject;
    address?: StringValueObject | null;
    email?: EmailValueObject | null;
    primaryPhone?: StringValueObject | null;
    emergencyPhone?: StringValueObject | null;
    notes?: StringValueObject | null;
  } = {}): Veterinary {
    const id = UUID.generate();

    return Veterinary.create({
      id,
      name,
      address,
      email,
      primaryPhone,
      emergencyPhone,
      notes,
    });
  }

  static createWith({
    id = UUID.generate(),
    name = new StringValueObject(faker.company.name()),
    address = new StringValueObject(faker.location.streetAddress()),
    email = new EmailValueObject(faker.internet.email()),
    primaryPhone = new StringValueObject(faker.phone.number()),
    emergencyPhone = new StringValueObject(faker.phone.number()),
    notes = new StringValueObject(faker.lorem.sentence()),
    createdAt = new DateValueObject(new Date()),
    updatedAt = null,
    deletedAt = null,
  }: {
    id?: UUID;
    name?: StringValueObject;
    address?: StringValueObject | null;
    email?: EmailValueObject | null;
    primaryPhone?: StringValueObject | null;
    emergencyPhone?: StringValueObject | null;
    notes?: StringValueObject | null;
    createdAt?: DateValueObject;
    updatedAt?: DateValueObject | null;
    deletedAt?: DateValueObject | null;
  } = {}): Veterinary {
    return new Veterinary({
      id,
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
  }

  static fromPrimitives(params: {
    id: string;
    name: string;
    address: string | null;
    email: string | null;
    primaryPhone: string | null;
    emergencyPhone: string | null;
    notes: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
  }): Veterinary {
    return Veterinary.fromPrimitives(params);
  }
}

describe('VeterinaryObjectMother', () => {
  it('should create a veterinary with default values', () => {
    const name = new StringValueObject('Test Veterinary');
    const email = new EmailValueObject('test@veterinary.com');

    const veterinary = VeterinaryObjectMother.create({ name, email });

    expect(veterinary.getId()).not.toBeNull();
    expect(veterinary.getName().equals(name)).toBe(true);
    expect(veterinary.getEmail()?.equals(email)).toBe(true);
    expect(veterinary.getAddress()).not.toBeNull();
    expect(veterinary.getPrimaryPhone()).not.toBeNull();
    expect(veterinary.getEmergencyPhone()).not.toBeNull();
    expect(veterinary.getNotes()).not.toBeNull();
    expect(veterinary.getCreatedAt()).not.toBeNull();
    expect(veterinary.getUpdatedAt()).toBeNull();
    expect(veterinary.getDeletedAt()).toBeNull();
  });

  it('should create a veterinary with custom values', () => {
    const id = UUID.generate();
    const name = new StringValueObject('Custom Veterinary');
    const address = new StringValueObject('123 Main St');
    const email = new EmailValueObject('custom@veterinary.com');
    const primaryPhone = new StringValueObject('123-456-7890');
    const emergencyPhone = new StringValueObject('987-654-3210');
    const notes = new StringValueObject('Custom notes');
    const createdAt = new DateValueObject(new Date());

    const veterinary = VeterinaryObjectMother.createWith({
      id,
      name,
      address,
      email,
      primaryPhone,
      emergencyPhone,
      notes,
      createdAt,
    });

    expect(veterinary.getId().equals(id)).toBe(true);
    expect(veterinary.getName().equals(name)).toBe(true);
    expect(veterinary.getAddress()?.equals(address)).toBe(true);
    expect(veterinary.getEmail()?.equals(email)).toBe(true);
    expect(veterinary.getPrimaryPhone()?.equals(primaryPhone)).toBe(true);
    expect(veterinary.getEmergencyPhone()?.equals(emergencyPhone)).toBe(true);
    expect(veterinary.getNotes()?.equals(notes)).toBe(true);
    expect(veterinary.getCreatedAt().equals(createdAt)).toBe(true);
    expect(veterinary.getUpdatedAt()).toBeNull();
    expect(veterinary.getDeletedAt()).toBeNull();
  });

  it('should create a veterinary from primitives', () => {
    const id = faker.string.uuid();
    const name = faker.company.name();
    const address = faker.location.streetAddress();
    const email = faker.internet.email();
    const primaryPhone = faker.phone.number();
    const emergencyPhone = faker.phone.number();
    const notes = faker.lorem.sentence();
    const createdAt = faker.date.recent();
    const updatedAt = faker.date.recent();
    const deletedAt = faker.date.recent();

    const veterinary = VeterinaryObjectMother.fromPrimitives({
      id,
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

    expect(veterinary.getId().equals(new UUID(id))).toBe(true);
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
