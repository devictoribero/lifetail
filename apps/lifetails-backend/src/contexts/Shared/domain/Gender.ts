import { UnsupportedGenderException } from './exceptions/UnsupportedGenderException';

export enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
}

export class Gender {
  static readonly Male = new Gender(GenderEnum.Male);
  static readonly Female = new Gender(GenderEnum.Female);
  private static readonly types = [Gender.Male, Gender.Female];

  private constructor(private readonly value: string) {}

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
