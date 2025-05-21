import { AggregateRoot } from 'src/contexts/Shared/domain/AggregateRoot';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { VeterinaryNameTooShortException } from '../exceptions/VeterinaryNameTooShortException';

export class Veterinary extends AggregateRoot {
  private id: UUID;

  private name: StringValueObject;
  private address: StringValueObject | null;
  private email: EmailValueObject | null;
  private primaryPhone: StringValueObject | null;
  private emergencyPhone: StringValueObject | null;
  private notes: StringValueObject | null;

  private createdAt: DateValueObject;
  private updatedAt: DateValueObject | null;
  private deletedAt: DateValueObject | null;

  // Use for testing purposes only. It should not be used in the domain.
  constructor({
    id,
    name,
    address = null,
    email = null,
    primaryPhone = null,
    emergencyPhone = null,
    notes = null,
    createdAt,
    updatedAt = null,
    deletedAt = null,
  }: {
    id: UUID;
    name: StringValueObject;
    address?: StringValueObject | null;
    email?: EmailValueObject | null;
    primaryPhone?: StringValueObject | null;
    emergencyPhone?: StringValueObject | null;
    notes?: StringValueObject | null;
    createdAt: DateValueObject;
    updatedAt?: DateValueObject | null;
    deletedAt?: DateValueObject | null;
  }) {
    super();
    this.ensureValidName(name);

    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.primaryPhone = primaryPhone;
    this.emergencyPhone = emergencyPhone;
    this.notes = notes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  private ensureValidName(name: StringValueObject): void {
    if (name.toString().length < 3) {
      throw new VeterinaryNameTooShortException();
    }
  }

  // Use to create the entity from the domain
  static create({
    id,
    name,
    address = null,
    email = null,
    primaryPhone = null,
    emergencyPhone = null,
    notes = null,
  }: {
    id: UUID;
    name: StringValueObject;
    address?: StringValueObject | null;
    email?: EmailValueObject | null;
    primaryPhone?: StringValueObject | null;
    emergencyPhone?: StringValueObject | null;
    notes?: StringValueObject | null;
  }) {
    const now = new DateValueObject(new Date());
    return new Veterinary({
      id,
      name,
      address,
      email,
      primaryPhone,
      emergencyPhone,
      notes,
      createdAt: now,
    });
  }

  // Use to reconstruct the entity from the database
  static fromPrimitives({
    id,
    name,
    address,
    email,
    primaryPhone,
    emergencyPhone,
    notes,
    createdAt,
    updatedAt = null,
    deletedAt = null,
  }: {
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
  }) {
    return new Veterinary({
      id: new UUID(id),
      name: new StringValueObject(name),
      address: address ? new StringValueObject(address) : null,
      email: email ? new EmailValueObject(email) : null,
      primaryPhone: primaryPhone ? new StringValueObject(primaryPhone) : null,
      emergencyPhone: emergencyPhone ? new StringValueObject(emergencyPhone) : null,
      notes: notes ? new StringValueObject(notes) : null,
      createdAt: new DateValueObject(createdAt),
      updatedAt: updatedAt ? new DateValueObject(updatedAt) : null,
      deletedAt: deletedAt ? new DateValueObject(deletedAt) : null,
    });
  }

  public getId(): UUID {
    return this.id;
  }

  public getName(): StringValueObject {
    return this.name;
  }

  public getAddress(): StringValueObject | null {
    return this.address;
  }

  public getEmail(): EmailValueObject | null {
    return this.email;
  }

  public getPrimaryPhone(): StringValueObject | null {
    return this.primaryPhone;
  }

  public getEmergencyPhone(): StringValueObject | null {
    return this.emergencyPhone;
  }

  public getNotes(): StringValueObject | null {
    return this.notes;
  }

  public getCreatedAt(): DateValueObject {
    return this.createdAt;
  }

  public getUpdatedAt(): DateValueObject | null {
    return this.updatedAt;
  }

  public getDeletedAt(): DateValueObject | null {
    return this.deletedAt;
  }

  public rename(name: StringValueObject): void {
    this.ensureValidName(name);
    this.name = name;
    this.updatedAt = new DateValueObject(new Date());
  }

  public relocate(address: StringValueObject | null): void {
    this.address = address;
    this.updatedAt = new DateValueObject(new Date());
  }

  public changeContactEmail(email: EmailValueObject | null): void {
    this.email = email;
    this.updatedAt = new DateValueObject(new Date());
  }

  public addPrimaryPhone(phone: StringValueObject | null): void {
    this.primaryPhone = phone;
    this.updatedAt = new DateValueObject(new Date());
  }

  public addEmergencyPhone(phone: StringValueObject | null): void {
    this.emergencyPhone = phone;
    this.updatedAt = new DateValueObject(new Date());
  }

  public documentAdditionalInfo(notes: StringValueObject | null): void {
    this.notes = notes;
    this.updatedAt = new DateValueObject(new Date());
  }

  public markAsDeleted(): void {
    this.deletedAt = new DateValueObject(new Date());
  }

  public toPrimitives(): any {
    return {
      id: this.id.toString(),
      name: this.name.toString(),
      address: this.address?.toString() || null,
      email: this.email?.toString() || null,
      primaryPhone: this.primaryPhone?.toString() || null,
      emergencyPhone: this.emergencyPhone?.toString() || null,
      notes: this.notes?.toString() || null,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt?.toISOString() || null,
      deletedAt: this.deletedAt?.toISOString() || null,
    };
  }
}
