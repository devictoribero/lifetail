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
  private chipId: StringValueObject | null;

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
    chipId = null,
  }: {
    id: UUID;
    species: Species;
    name: StringValueObject;
    gender: Gender;
    sterilized: BooleanValueObject;
    anniversaryDate?: DateValueObject | null;
    createdAt: DateValueObject;
    ownerId?: UUID | null;
    chipId?: StringValueObject | null;
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
    this.chipId = chipId;
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
  }: {
    id: UUID;
    species: Species;
    name: StringValueObject;
    gender: Gender;
    sterilized: BooleanValueObject;
    anniversaryDate: DateValueObject;
    ownerId: UUID;
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
    chipId = null,
  }: {
    id: string;
    species: string;
    name: string;
    gender: string;
    sterilized: boolean;
    anniversaryDate: Date;
    createdAt: Date;
    ownerId: string;
    chipId?: string | null;
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
      chipId: chipId ? new StringValueObject(chipId) : null,
    });
  }

  public getId(): UUID {
    return this.id;
  }

  public getCreatedAt(): DateValueObject {
    return this.createdAt;
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

  public getChipId(): StringValueObject | null {
    return this.chipId ?? null;
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
      chipId: this.chipId?.toString() ?? null,
    };
  }

  public renameTo(name: StringValueObject): void {
    this.name = name;
  }

  public changeGenderTo(gender: Gender): void {
    this.gender = gender;
  }

  public sterilize(): void {
    this.sterilized = new BooleanValueObject(true);
  }

  public unsterilize(): void {
    this.sterilized = new BooleanValueObject(false);
  }

  public changeBirthdateTo(anniversaryDate: DateValueObject): void {
    this.anniversaryDate = anniversaryDate;
  }

  public changeChipIdTo(chipId: StringValueObject): void {
    this.chipId = chipId;
  }
}
