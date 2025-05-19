import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { AggregateRoot } from 'src/contexts/Shared/domain/AggregateRoot';
import { Species } from 'src/contexts/PetManagement/Pet/domain/entities/PetSpecies';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { PetAddedDomainEvent } from '../PetAddedDomainEvent';

export class Pet extends AggregateRoot {
  private id: UUID;
  private species: Species;
  private name: StringValueObject;
  private gender: Gender;
  private sterilized: BooleanValueObject;
  private createdAt: DateValueObject;
  // Represents the date of birth or arrival date.
  // This is the date used to celebrate the pet's birthday.
  private anniversaryDate: DateValueObject | null;
  private ownerId: UUID | null;
  private microchipNumber: StringValueObject | null;
  private color: StringValueObject;
  private updatedAt: DateValueObject | null;
  private deletedAt: DateValueObject | null;

  // Use for testing purposes only. It should not be used in the domain.
  constructor({
    id,
    species,
    name,
    gender,
    sterilized,
    anniversaryDate = null,
    createdAt,
    ownerId = null,
    microchipNumber = null,
    color,
    updatedAt = null,
    deletedAt = null,
  }: {
    id: UUID;
    species: Species;
    name: StringValueObject;
    gender: Gender;
    sterilized: BooleanValueObject;
    anniversaryDate?: DateValueObject | null;
    createdAt: DateValueObject;
    ownerId?: UUID | null;
    microchipNumber?: StringValueObject | null;
    color: StringValueObject;
    updatedAt?: DateValueObject | null;
    deletedAt?: DateValueObject | null;
  }) {
    super();
    this.id = id;
    this.createdAt = createdAt;
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.sterilized = sterilized;
    this.anniversaryDate = anniversaryDate;
    this.ownerId = ownerId;
    this.microchipNumber = microchipNumber;
    this.color = color;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  // Use to create the entity from the domain
  static create({
    id,
    species,
    name,
    gender,
    sterilized,
    anniversaryDate,
    ownerId,
    color,
  }: {
    id: UUID;
    species: Species;
    name: StringValueObject;
    gender: Gender;
    sterilized: BooleanValueObject;
    anniversaryDate: DateValueObject;
    ownerId: UUID;
    color: StringValueObject;
  }) {
    const now = new DateValueObject(new Date());
    const pet = new Pet({
      id,
      species,
      name,
      gender,
      sterilized,
      anniversaryDate,
      createdAt: now,
      ownerId,
      color,
    });

    pet.record(new PetAddedDomainEvent({ aggregateId: id.toString(), name: name.toString() }));

    return pet;
  }

  // Use to reconstruct the entity from the database
  static fromPrimitives({
    id,
    species,
    name,
    gender,
    sterilized,
    anniversaryDate,
    createdAt,
    ownerId,
    microchipNumber = null,
    color,
    updatedAt = null,
    deletedAt = null,
  }: {
    id: string;
    species: string;
    name: string;
    gender: string;
    sterilized: boolean;
    anniversaryDate: Date;
    createdAt: Date;
    ownerId: string;
    microchipNumber?: string | null;
    color: string;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
  }) {
    return new Pet({
      id: new UUID(id),
      species: Species.fromPrimitives(species),
      name: new StringValueObject(name),
      gender: Gender.fromPrimitives(gender),
      sterilized: new BooleanValueObject(sterilized),
      anniversaryDate: anniversaryDate ? new DateValueObject(anniversaryDate) : null,
      createdAt: new DateValueObject(createdAt),
      ownerId: new UUID(ownerId),
      microchipNumber: microchipNumber ? new StringValueObject(microchipNumber) : null,
      color: new StringValueObject(color),
      updatedAt: updatedAt ? new DateValueObject(updatedAt) : null,
      deletedAt: deletedAt ? new DateValueObject(deletedAt) : null,
    });
  }

  public getId(): UUID {
    return this.id;
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

  public getSpecies(): Species {
    return this.species;
  }

  public getName(): StringValueObject {
    return this.name;
  }

  public getGender(): Gender {
    return this.gender;
  }

  public isSterilized(): BooleanValueObject {
    return this.sterilized;
  }

  public getAnniversaryDate(): DateValueObject {
    return this.anniversaryDate;
  }

  public getOwnerId(): UUID | null {
    return this.ownerId;
  }

  public getMicrochipNumber(): StringValueObject | null {
    return this.microchipNumber ?? null;
  }

  public getColor(): StringValueObject {
    return this.color;
  }

  public toPrimitives(): any {
    return {
      id: this.id.toString(),
      species: this.species.toString(),
      name: this.name.toString(),
      gender: this.gender.toString(),
      sterilized: this.sterilized.getValue(),
      anniversaryDate: this.anniversaryDate?.toISOString() ?? null,
      createdAt: this.createdAt.toISOString(),
      ownerId: this.ownerId?.toString() ?? null,
      microchipNumber: this.microchipNumber?.toString() ?? null,
      color: this.color.toString(),
      updatedAt: this.updatedAt?.toISOString() ?? null,
      deletedAt: this.deletedAt?.toISOString() ?? null,
    };
  }

  private updateLastModified(): void {
    this.updatedAt = new DateValueObject(new Date());
  }

  public renameTo(name: StringValueObject): void {
    this.name = name;
    this.updateLastModified();
  }

  public changeGenderTo(gender: Gender): void {
    this.gender = gender;
    this.updateLastModified();
  }

  public sterilize(): void {
    this.sterilized = new BooleanValueObject(true);
    this.updateLastModified();
  }

  public unsterilize(): void {
    this.sterilized = new BooleanValueObject(false);
    this.updateLastModified();
  }

  public changeBirthdateTo(anniversaryDate: DateValueObject): void {
    this.anniversaryDate = anniversaryDate;
    this.updateLastModified();
  }

  public changeMicrochipNumberTo(microchipNumber: StringValueObject): void {
    this.microchipNumber = microchipNumber;
    this.updateLastModified();
  }

  public changeColorTo(color: StringValueObject): void {
    this.color = color;
    this.updateLastModified();
  }

  public markAsDeleted(): void {
    this.deletedAt = new DateValueObject(new Date());
    this.updateLastModified();
  }
}
