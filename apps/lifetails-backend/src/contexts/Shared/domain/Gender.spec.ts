import { UnsupportedGenderException } from './exceptions/UnsupportedGenderException';
import { Gender, GenderEnum } from './Gender';

const SUPPORTED_GENDERS = [
  { name: 'Male', constant: Gender.Male, code: GenderEnum.Male },
  { name: 'Female', constant: Gender.Female, code: GenderEnum.Female },
];

describe('Gender', () => {
  SUPPORTED_GENDERS.forEach((gender) => {
    describe(`${gender.name} gender`, () => {
      it('should throw an UnsupportedGenderException when creating from invalid code', () => {
        expect(() => {
          Gender.fromPrimitives('invalid-gender');
        }).toThrow(UnsupportedGenderException);
      });

      it(`should define ${gender.name} with code "${gender.code}"`, () => {
        expect(gender.constant.toString()).toBe(gender.code);
      });

      it(`should create ${gender.name} gender using code "${gender.code}" with create method`, () => {
        const created = Gender.create(gender.code);

        expect(created.equals(gender.constant)).toBeTruthy();
      });

      it(`should reconstruct ${gender.name} gender from code "${gender.code}" with fromPrimitives method`, () => {
        const reconstructed = Gender.fromPrimitives(gender.code);

        expect(reconstructed).toBe(gender.constant);
      });
    });
  });
});
