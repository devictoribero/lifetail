import { StringValueObject } from 'src/modules/Shared/domain/StringValueObject';
import { InvalidPetGenderException } from '../exceptions/InvalidPetGenderException';

export class PetGender extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  // Use to create the entity from the domain
  public static create(value: string): PetGender {
    return new PetGender(value);
  }

  // Use to reconstruct the entity from the database
  public static fromPrimitives(value: string): PetGender {
    const petGender = new PetGender(value);
    const gender = PetGender.all.find((gender) => gender.equals(petGender));

    if (!gender) {
      throw new InvalidPetGenderException(value);
    }

    return gender;
  }

  public static readonly Male = new PetGender('Male');
  public static readonly Female = new PetGender('Female');

  public static readonly all = [PetGender.Male, PetGender.Female];
}
