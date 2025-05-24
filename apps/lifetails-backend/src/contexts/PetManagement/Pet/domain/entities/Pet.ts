import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { NumberValueObject } from 'src/contexts/Shared/domain/NumberValueObject';
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
  // This is the date used to celebrate the pet's birthday.
  private birthDate: DateValueObject;
  // Represents the date of arrival to the owner.
  private arrivalDate: DateValueObject;
  private microchipNumber: StringValueObject | null;
  private color: StringValueObject;

  private ownerId: UUID | null;

  private createdAt: DateValueObject;
  private updatedAt: DateValueObject | null;
  private deletedAt: DateValueObject | null;

  // Use for testing purposes only. It should not be used in the domain.
  constructor({
    id,
    species,
    name,
    gender,
    sterilized,
    birthDate,
    arrivalDate,
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
    birthDate?: DateValueObject;
    arrivalDate?: DateValueObject;
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
    this.birthDate = birthDate;
    this.arrivalDate = arrivalDate;
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
    birthDate,
    arrivalDate,
    ownerId,
    color,
  }: {
    id: UUID;
    species: Species;
    name: StringValueObject;
    gender: Gender;
    sterilized: BooleanValueObject;
    birthDate: DateValueObject;
    arrivalDate: DateValueObject;
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
      birthDate,
      arrivalDate,
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
    birthDate,
    arrivalDate,
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
    birthDate: Date;
    arrivalDate: Date;
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
      birthDate: new DateValueObject(birthDate),
      arrivalDate: new DateValueObject(arrivalDate),
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

  public getBirthDate(): DateValueObject {
    return this.birthDate;
  }

  public getArrivalDate(): DateValueObject {
    return this.arrivalDate;
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

  /**
   * Calculates the pet's age based on their birth date.
   * The age is calculated by comparing the current date with the birth date,
   * taking into account whether the birthday has occurred in the current year.
   *
   * For a pet born on March 20, 2020:
   * - If today is 2024-03-15, age is 3 (birthday hasn't occurred yet this year)
   * - If today is 2024-03-20, age is 4 (birthday is today)
   * - If today is 2024-03-25, age is 4 (birthday has occurred this year)
   *
   * @returns {NumberValueObject} The pet's age in years
   */
  private calculateAge(): NumberValueObject {
    const today = new Date();
    const birthDate = this.birthDate.toDate();

    // Calculate the difference in years
    const yearDiff = today.getFullYear() - birthDate.getFullYear();

    // Check if birthday has occurred this year
    const hasBirthdayOccurredThisYear = this.hasBirthdayOccurredThisYear(today, birthDate);

    // If birthday hasn't occurred this year, subtract one year
    const age = hasBirthdayOccurredThisYear ? yearDiff : yearDiff - 1;

    return new NumberValueObject(age);
  }

  /**
   * Determines if the birthday has already occurred in the current year.
   * A birthday is considered to have occurred if:
   * 1. The current month is after the birth month, OR
   * 2. The current month is the same as the birth month AND the current day is on or after the birth day
   */
  private hasBirthdayOccurredThisYear(today: Date, birthDate: Date): boolean {
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const isSameMonth = monthDiff === 0;
    const isAfterMonth = monthDiff > 0;
    const isSameDayOrAfter = isSameMonth && today.getDate() >= birthDate.getDate();

    return isAfterMonth || isSameDayOrAfter;
  }

  public getAge(): NumberValueObject {
    return this.calculateAge();
  }

  public toPrimitives(): any {
    return {
      id: this.id.toString(),
      species: this.species.toString(),
      name: this.name.toString(),
      gender: this.gender.toString(),
      sterilized: this.sterilized.getValue(),
      birthDate: this.birthDate?.toISOString(),
      arrivalDate: this.arrivalDate?.toISOString(),
      microchipNumber: this.microchipNumber?.toString() ?? null,
      age: this.getAge().toNumber(),
      color: this.color.toString(),
      ownerId: this.ownerId?.toString() ?? null,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt?.toISOString() ?? null,
      deletedAt: this.deletedAt?.toISOString() ?? null,
    };
  }

  private markAsUpdated(): void {
    this.updatedAt = new DateValueObject(new Date());
  }

  public renameTo(name: StringValueObject): void {
    this.name = name;
    this.markAsUpdated();
  }

  public changeGenderTo(gender: Gender): void {
    this.gender = gender;
    this.markAsUpdated();
  }

  public sterilize(): void {
    this.sterilized = new BooleanValueObject(true);
    this.markAsUpdated();
  }

  public unsterilize(): void {
    this.sterilized = new BooleanValueObject(false);
    this.markAsUpdated();
  }

  public changeBirthdateTo(birthDate: DateValueObject): void {
    this.birthDate = birthDate;
    this.markAsUpdated();
  }

  public changeArrivalDateTo(arrivalDate: DateValueObject): void {
    this.arrivalDate = arrivalDate;
    this.markAsUpdated();
  }

  public changeMicrochipNumberTo(microchipNumber: StringValueObject): void {
    this.microchipNumber = microchipNumber;
    this.markAsUpdated();
  }

  public changeColorTo(color: StringValueObject): void {
    this.color = color;
    this.markAsUpdated();
  }

  public markAsDeleted(): void {
    this.deletedAt = new DateValueObject(new Date());
    this.markAsUpdated();
  }
}
