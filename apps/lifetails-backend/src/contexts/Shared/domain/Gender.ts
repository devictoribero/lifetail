import { UnsupportedGenderException } from './exceptions/UnsupportedGenderException';
import { StringValueObject } from './StringValueObject';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class Gender extends StringValueObject {
  static readonly MALE = new Gender(GenderEnum.MALE);
  static readonly FEMALE = new Gender(GenderEnum.FEMALE);
  private static readonly types = [Gender.MALE, Gender.FEMALE];

  private constructor(value: string) {
    super(value);
  }

  static create(value: string): Gender {
    const gender = this.fromPrimitives(value);

    if (!gender) {
      throw new UnsupportedGenderException(value);
    }

    return gender;
  }

  static fromPrimitives(value: string): Gender {
    const gender = this.types.find((gender) => gender.value === value);

    if (!gender) {
      throw new UnsupportedGenderException(value);
    }

    return gender;
  }

  toString(): string {
    return this.value;
  }

  equals(other: Gender): boolean {
    return this.value === other.value;
  }
}
