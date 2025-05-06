import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { InvalidGenderException } from '../exceptions/InvalidGenderException';

export class Gender extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  // Use to create the entity from the domain
  public static create(value: string): Gender {
    return new Gender(value);
  }

  // Use to reconstruct the entity from the database
  public static fromPrimitives(value: string): Gender {
    const petGender = new Gender(value);
    const gender = Gender.all.find((gender) => gender.equals(petGender));

    if (!gender) {
      throw new InvalidGenderException(value);
    }

    return gender;
  }

  public static readonly Male = new Gender('Male');
  public static readonly Female = new Gender('Female');

  public static readonly all = [Gender.Male, Gender.Female];
}
