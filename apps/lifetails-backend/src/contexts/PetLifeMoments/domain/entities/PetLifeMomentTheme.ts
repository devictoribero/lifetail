import { InvalidPetLifeThemeException } from '../exceptions/InvalidPetLifeThemeException';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';

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

  /*
   * Celebrate the joyful moments that define your pet’s life — from the first day
   * they arrived to the milestones they achieve along the way.
   */
  public static readonly Celebration = new PetLifeMomentTheme('Celebration');
  /*
   * Treasure the moments that make life with a pet special. Whether it’s a quiet
   * cuddle or a playful adventure, these moments stay in the heart forever.
   */
  public static readonly Memories = new PetLifeMomentTheme('Memories');
  /*
   * Capture the energy and joy of a pet’s favorite activities. Whether it's a
   * simple walk or an exciting game, these moments bring happiness and connection.
   */
  public static readonly Activity = new PetLifeMomentTheme('Activity');
  /*
   * Track the meals that shape a pet's journey, from healthy eating habits to
   * special treats that show care and affection.
   */
  public static readonly Diet = new PetLifeMomentTheme('Diet');
  /*
   * Document the moments of pampering and care that make a pet look and feel their
   * best, from grooming visits to daily maintenance.
   */
  public static readonly HygieneAndBeauty = new PetLifeMomentTheme('Hygiene and Beauty');
  /*
   * Keep track of all health-related moments, from veterinary visits to illness
   * and recovery, marking the important moments in a pet’s well-being journey.
   */
  public static readonly Health = new PetLifeMomentTheme('Health');
  /*
   * Saying goodbye is one of the hardest moments in a pet’s journey, but their
   * memory continues to live on in the heart.
   */
  public static readonly Farewell = new PetLifeMomentTheme('Farewell');

  public static readonly types = [
    PetLifeMomentTheme.Celebration,
    PetLifeMomentTheme.Memories,
    PetLifeMomentTheme.Health,
    PetLifeMomentTheme.Diet,
    PetLifeMomentTheme.Activity,
    PetLifeMomentTheme.HygieneAndBeauty,
    PetLifeMomentTheme.Farewell,
  ];
}
