import { StringValueObject } from 'src/Lifetails/contexts/Shared/domain/StringValueObject';
import { PetLifeMomentTheme } from './PetLifeMomentTheme';
import { InvalidPetLifeMomentTypeException } from '../exceptions/InvalidPetLifeMomentTypeException';

export class PetLifeMomentType extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  // Use to create the entity from the domain
  public static create(value: string): PetLifeMomentType {
    return new PetLifeMomentType(value);
  }

  // Use to reconstruct the entity from the database
  public static fromPrimitives(value: string): PetLifeMomentType {
    const type = PetLifeMomentType.types.find((type) => type.value === value);
    if (!type) {
      throw new InvalidPetLifeMomentTypeException(value);
    }

    return type;
  }

  public getTheme(): PetLifeMomentTheme {
    switch (this.value) {
      case 'Arrival':
      case 'Anniversary':
      case 'Achievement':
      case 'Gift':
      case 'Move':
        return PetLifeMomentTheme.Celebration;
      // @todo: Add memories theme
      case 'Walk':
      case 'Exercise':
      case 'Play':
      case 'Training':
      case 'Socialization':
      case 'Excursion':
        return PetLifeMomentTheme.Activity;
      case 'DietChange':
      case 'SpecialMeal':
      case 'Hydration':
        return PetLifeMomentTheme.DeliciousMoments;
      case 'GroomingVisit':
      case 'NailCut':
      case 'Bath':
        return PetLifeMomentTheme.GroomingAndCare;
      case 'VeterinaryVisit':
      case 'Vaccination':
      case 'Medication':
      case 'Surgery':
      case 'Illness':
      case 'Discomfort':
      case 'Injury':
        return PetLifeMomentTheme.Wellness;
      case 'Goodbye':
      case 'Death':
        return PetLifeMomentTheme.Farewell;
      default:
        throw new InvalidPetLifeMomentTypeException(this.value);
    }
  }

  public static readonly Achievement = new PetLifeMomentType('Achievement');
  public static readonly Anniversary = new PetLifeMomentType('Anniversary');
  public static readonly Arrival = new PetLifeMomentType('Arrival');
  public static readonly Bath = new PetLifeMomentType('Bath');
  public static readonly Death = new PetLifeMomentType('Death');
  public static readonly DietChange = new PetLifeMomentType('DietChange');
  public static readonly Discomfort = new PetLifeMomentType('Discomfort');
  public static readonly Excursion = new PetLifeMomentType('Excursion');
  public static readonly Exercise = new PetLifeMomentType('Exercise');
  public static readonly Gift = new PetLifeMomentType('Gift');
  public static readonly Goodbye = new PetLifeMomentType('Goodbye');
  public static readonly GroomingVisit = new PetLifeMomentType('GroomingVisit');
  public static readonly Hydration = new PetLifeMomentType('Hydration');
  public static readonly Illness = new PetLifeMomentType('Illness');
  public static readonly Injury = new PetLifeMomentType('Injury');
  public static readonly Medication = new PetLifeMomentType('Medication');
  public static readonly Move = new PetLifeMomentType('Move');
  public static readonly NailCut = new PetLifeMomentType('NailCut');
  public static readonly Play = new PetLifeMomentType('Play');
  public static readonly Socialization = new PetLifeMomentType('Socialization');
  public static readonly SpecialMeal = new PetLifeMomentType('SpecialMeal');
  public static readonly Surgery = new PetLifeMomentType('Surgery');
  public static readonly Training = new PetLifeMomentType('Training');
  public static readonly Vaccination = new PetLifeMomentType('Vaccination');
  public static readonly VeterinaryVisit = new PetLifeMomentType('VeterinaryVisit');
  public static readonly Walk = new PetLifeMomentType('Walk');

  public static readonly types = [
    PetLifeMomentType.Achievement,
    PetLifeMomentType.Anniversary,
    PetLifeMomentType.Arrival,
    PetLifeMomentType.Bath,
    PetLifeMomentType.Death,
    PetLifeMomentType.DietChange,
    PetLifeMomentType.Discomfort,
    PetLifeMomentType.Excursion,
    PetLifeMomentType.Exercise,
    PetLifeMomentType.Gift,
    PetLifeMomentType.Goodbye,
    PetLifeMomentType.GroomingVisit,
    PetLifeMomentType.Hydration,
    PetLifeMomentType.Illness,
    PetLifeMomentType.Injury,
    PetLifeMomentType.Medication,
    PetLifeMomentType.Move,
    PetLifeMomentType.NailCut,
    PetLifeMomentType.Play,
    PetLifeMomentType.Socialization,
    PetLifeMomentType.SpecialMeal,
    PetLifeMomentType.Surgery,
    PetLifeMomentType.Training,
    PetLifeMomentType.Vaccination,
    PetLifeMomentType.VeterinaryVisit,
    PetLifeMomentType.Walk,
  ];
}
