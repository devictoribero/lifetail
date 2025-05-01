import { BooleanValueObject } from 'src/modules/Shared/domain/BooleanValueObject';
import { StringValueObject } from 'src/modules/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/modules/Shared/domain/DateValueObject';
import { PetGender } from './PetGender';
import { AggregateRoot } from 'src/modules/Shared/domain/AggregateRoot';

export class Pet extends AggregateRoot {
  private name: StringValueObject;
  private gender: PetGender;
  private chipId: StringValueObject;
  private sterilized: BooleanValueObject;
  private birthdate: DateValueObject;

  private constructor(
    id: string,
    name: StringValueObject,
    gender: PetGender,
    chipId: StringValueObject,
    sterilized: BooleanValueObject,
    birthdate: DateValueObject,
  ) {
    super(id);
    this.name = name;
    this.gender = gender;
    this.chipId = chipId;
    this.sterilized = sterilized;
    this.birthdate = birthdate;
  }

  // Use to create the entity from the domain
  static create(
    id: string,
    name: StringValueObject,
    gender: PetGender,
    chipId: StringValueObject,
    sterilized: BooleanValueObject,
    birthdate: DateValueObject,
  ) {
    return new Pet(id, name, gender, chipId, sterilized, birthdate);
  }

  // Use to reconstruct the entity from the database
  static fromPrimitives(
    id: string,
    name: string,
    gender: string,
    chipId: string,
    sterilized: boolean,
    birthdate: Date,
  ) {
    return new Pet(
      id,
      new StringValueObject(name),
      PetGender.fromPrimitives(gender),
      new StringValueObject(chipId),
      new BooleanValueObject(sterilized),
      new DateValueObject(birthdate),
    );
  }

  public getName(): StringValueObject {
    return this.name;
  }

  public getGender(): PetGender {
    return this.gender;
  }

  public getChipId(): StringValueObject {
    return this.chipId;
  }

  public isSterilized(): BooleanValueObject {
    return this.sterilized;
  }

  public getBirthdate(): DateValueObject {
    return this.birthdate;
  }

  public toPrimitives(): any {
    return {
      id: this.id,
      name: this.name.toString(),
      gender: this.gender.toString(),
      chipId: this.chipId.toString(),
      sterilized: this.sterilized.getValue(),
      birthdate: this.birthdate.toISOString(),
    };
  }

  public renameTo(name: StringValueObject): void {
    this.name = name;
  }

  public changeGenderTo(gender: PetGender): void {
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

  public changeBirthdateTo(birthdate: DateValueObject): void {
    this.birthdate = birthdate;
  }
}
