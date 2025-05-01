import { ValueObject } from 'src/modules/Shared/domain/ValueObject';
import { InvalidPetLifeThemeException } from '../exceptions/InvalidPetLifeThemeException';
import { StringValueObject } from 'src/modules/Shared/domain/StringValueObject';

export class PetLifeMomentTheme extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  public static fromPrimitives(value: string): PetLifeMomentTheme {
    const theme = PetLifeMomentTheme.types.find((type) => type.value === value);
    if (!theme) {
      throw new InvalidPetLifeThemeException(value);
    }
    return theme;
  }

  public static readonly Celebration = new PetLifeMomentTheme('Celebration');
  public static readonly Health = new PetLifeMomentTheme('Health');
  public static readonly Diet = new PetLifeMomentTheme('Diet');
  public static readonly Activity = new PetLifeMomentTheme('Activity');
  public static readonly HygieneAndBeauty = new PetLifeMomentTheme('Hygiene and Beauty');
  public static readonly Farewell = new PetLifeMomentTheme('Farewell');

  public static readonly types = [
    PetLifeMomentTheme.Celebration,
    PetLifeMomentTheme.Health,
    PetLifeMomentTheme.Diet,
    PetLifeMomentTheme.Activity,
    PetLifeMomentTheme.HygieneAndBeauty,
    PetLifeMomentTheme.Farewell,
  ];
}
