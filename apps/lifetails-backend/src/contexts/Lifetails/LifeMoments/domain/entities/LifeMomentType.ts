import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { LifeMomentTheme } from './LifeMomentTheme';
import { InvalidLifeMomentTypeException } from '../exceptions/InvalidLifeMomentTypeException';

export class LifeMomentType extends StringValueObject {
  // Use for testing purposes only. It should not be used in the domain.
  constructor(value: string) {
    super(value);
  }

  // Use to create the entity from the domain
  public static create(value: string): LifeMomentType {
    return new LifeMomentType(value);
  }

  // Use to reconstruct the entity from the database
  public static fromPrimitives(value: string): LifeMomentType {
    const type = LifeMomentType.types.find((type) => type.value === value);
    if (!type) {
      throw new InvalidLifeMomentTypeException(value);
    }

    return type;
  }

  public getTheme(): LifeMomentTheme {
    switch (this.value) {
      case 'Arrival':
      case 'Anniversary':
      case 'Achievement':
      case 'Gift':
      case 'Move':
        return LifeMomentTheme.Celebration;
      // @todo: Add memories theme
      case 'Walk':
      case 'Exercise':
      case 'Play':
      case 'Training':
      case 'Socialization':
      case 'Excursion':
        return LifeMomentTheme.Activity;
      case 'DietChange':
      case 'SpecialMeal':
      case 'Hydration':
        return LifeMomentTheme.DeliciousMoments;
      case 'GroomingVisit':
      case 'NailCut':
      case 'Bath':
        return LifeMomentTheme.GroomingAndCare;
      case 'VeterinaryVisit':
      case 'Vaccination':
      case 'Medication':
      case 'Surgery':
      case 'Illness':
      case 'Discomfort':
      case 'Injury':
        return LifeMomentTheme.Wellness;
      case 'Goodbye':
      case 'Death':
        return LifeMomentTheme.Farewell;
      default:
        throw new InvalidLifeMomentTypeException(this.value);
    }
  }

  public static readonly Achievement = new LifeMomentType('Achievement');
  public static readonly Anniversary = new LifeMomentType('Anniversary');
  public static readonly Arrival = new LifeMomentType('Arrival');
  public static readonly Bath = new LifeMomentType('Bath');
  public static readonly Death = new LifeMomentType('Death');
  public static readonly DietChange = new LifeMomentType('DietChange');
  public static readonly Discomfort = new LifeMomentType('Discomfort');
  public static readonly Excursion = new LifeMomentType('Excursion');
  public static readonly Exercise = new LifeMomentType('Exercise');
  public static readonly Gift = new LifeMomentType('Gift');
  public static readonly Goodbye = new LifeMomentType('Goodbye');
  public static readonly GroomingVisit = new LifeMomentType('GroomingVisit');
  public static readonly Hydration = new LifeMomentType('Hydration');
  public static readonly Illness = new LifeMomentType('Illness');
  public static readonly Injury = new LifeMomentType('Injury');
  public static readonly Medication = new LifeMomentType('Medication');
  public static readonly Move = new LifeMomentType('Move');
  public static readonly NailCut = new LifeMomentType('NailCut');
  public static readonly Play = new LifeMomentType('Play');
  public static readonly Socialization = new LifeMomentType('Socialization');
  public static readonly SpecialMeal = new LifeMomentType('SpecialMeal');
  public static readonly Surgery = new LifeMomentType('Surgery');
  public static readonly Training = new LifeMomentType('Training');
  public static readonly Vaccination = new LifeMomentType('Vaccination');
  public static readonly VeterinaryVisit = new LifeMomentType('VeterinaryVisit');
  public static readonly Walk = new LifeMomentType('Walk');

  public static readonly types = [
    LifeMomentType.Achievement,
    LifeMomentType.Anniversary,
    LifeMomentType.Arrival,
    LifeMomentType.Bath,
    LifeMomentType.Death,
    LifeMomentType.DietChange,
    LifeMomentType.Discomfort,
    LifeMomentType.Excursion,
    LifeMomentType.Exercise,
    LifeMomentType.Gift,
    LifeMomentType.Goodbye,
    LifeMomentType.GroomingVisit,
    LifeMomentType.Hydration,
    LifeMomentType.Illness,
    LifeMomentType.Injury,
    LifeMomentType.Medication,
    LifeMomentType.Move,
    LifeMomentType.NailCut,
    LifeMomentType.Play,
    LifeMomentType.Socialization,
    LifeMomentType.SpecialMeal,
    LifeMomentType.Surgery,
    LifeMomentType.Training,
    LifeMomentType.Vaccination,
    LifeMomentType.VeterinaryVisit,
    LifeMomentType.Walk,
  ];
}
