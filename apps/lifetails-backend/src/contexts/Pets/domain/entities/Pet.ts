import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { Gender } from '../../../Shared/domain/Gender';
import { AggregateRoot } from 'src/contexts/Shared/domain/AggregateRoot';
import { Species } from 'src/contexts/Pets/domain/entities/PetSpecies';

export class Pet extends AggregateRoot {
  private id: string;
  private createdAt: DateValueObject;
  private species: Species;
  private name: StringValueObject;
  private gender: Gender;
  private chipId: StringValueObject;
  private sterilized: BooleanValueObject;
  // Represents the date of birth or arrival date.
  // This is the date used to celebrate the pet's birthday.
  private birthDate: DateValueObject;
  private userId: string | null;

  // Use for testing purposes only. It should not be used in the domain.
  constructor(
    id: string,
    species: Species,
    name: StringValueObject,
    gender: Gender,
    chipId: StringValueObject,
    sterilized: BooleanValueObject,
    birthDate: DateValueObject,
    createdAt: DateValueObject,
    userId: string | null = null,
  ) {
    super();
    this.id = id;
    this.createdAt = createdAt;
    this.species = species;
    this.name = name;
    this.gender = gender;
    this.chipId = chipId;
    this.sterilized = sterilized;
    this.birthDate = birthDate;
    this.userId = userId;
  }

  // Use to create the entity from the domain
  static create(
    id: string,
    species: Species,
    name: StringValueObject,
    gender: Gender,
    chipId: StringValueObject,
    sterilized: BooleanValueObject,
    birthDate: DateValueObject,
    userId: string,
  ) {
    const now = new DateValueObject(new Date());
    return new Pet(id, species, name, gender, chipId, sterilized, birthDate, now, userId);
  }

  // Use to reconstruct the entity from the database
  static fromPrimitives(
    id: string,
    species: string,
    name: string,
    gender: string,
    chipId: string,
    sterilized: boolean,
    birthDate: Date,
    createdAt: Date,
    userId: string,
  ) {
    return new Pet(
      id,
      Species.fromPrimitives(species),
      new StringValueObject(name),
      Gender.fromPrimitives(gender),
      new StringValueObject(chipId),
      new BooleanValueObject(sterilized),
      new DateValueObject(birthDate),
      new DateValueObject(createdAt),
      userId,
    );
  }

  public getId(): string {
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

  public getChipId(): StringValueObject {
    return this.chipId;
  }

  public isSterilized(): BooleanValueObject {
    return this.sterilized;
  }

  public getBirthdate(): DateValueObject {
    return this.birthDate;
  }

  public getUserId(): string | null {
    return this.userId;
  }

  public toPrimitives(): any {
    return {
      id: this.id,
      species: this.species.toString(),
      name: this.name.toString(),
      gender: this.gender.toString(),
      chipId: this.chipId.toString(),
      sterilized: this.sterilized.getValue(),
      birthDate: this.birthDate.toISOString(),
      createdAt: this.createdAt.toISOString(),
      userId: this.userId,
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

  public changeChipIdTo(chipId: StringValueObject): void {
    this.chipId = chipId;
  }

  public changeBirthdateTo(birthDate: DateValueObject): void {
    this.birthDate = birthDate;
  }
}
