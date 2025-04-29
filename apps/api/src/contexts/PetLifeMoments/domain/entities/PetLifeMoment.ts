import { InvalidPetLifeMomentTypeException } from '../exceptions/InvalidPetLifeMomentTypeException';

export enum PetLifeMomentTheme {
  Celebration = 'Celebration',
  Health = 'Health',
  Diet = 'Diet',
  Activity = 'Activity',
  HygieneAndBeauty = 'Hygiene and Beauty',
  Farewell = 'Farewell',
}

export enum PetLifeMomentType {
  // Celebration
  Arrival = 'Arrival',
  Anniversary = 'Anniversary',
  Achievement = 'Achievement',
  Gift = 'Gift',
  // Activity
  Walk = 'Walk',
  Exercise = 'Exercise',
  Play = 'Play',
  Training = 'Training',
  Socialization = 'Socialization',
  Excursion = 'Excursion',
  Move = 'Move',
  // Diet
  DietChange = 'DietChange',
  SpecialMeal = 'SpecialMeal',
  Hydration = 'Hydration',
  // Hygiene and Beauty
  GroomingVisit = 'GroomingVisit',
  NailCut = 'NailCut',
  Bath = 'Bath',
  // Health
  VeterinaryVisit = 'VeterinaryVisit',
  Vaccination = 'Vaccination',
  Medication = 'Medication',
  Surgery = 'Surgery',
  Illness = 'Illness',
  Discomfort = 'Discomfort',
  Injury = 'Injury',
  // Farewell
  Goodbye = 'Goodbye',
  Death = 'Death',
}

export class PetLifeMoment {
  private id: string;
  private theme: PetLifeMomentTheme;
  private type: PetLifeMomentType;
  private petId: string;
  private createdBy: string;
  private occurredOn: Date;
  private description: string;

  constructor(
    id: string,
    type: PetLifeMomentType,
    petId: string,
    createdBy: string,
    occurredOn: Date,
    description: string,
  ) {
    this.id = id;
    this.theme = this.getMomentTheme(type);
    this.type = type;
    this.petId = petId;
    this.createdBy = createdBy;
    this.occurredOn = occurredOn;
    this.description = description;
  }

  static create(
    id: string,
    type: string,
    petId: string,
    createdBy: string,
    occurredOn: Date,
    description: string,
  ) {
    const typeEnum = PetLifeMomentType[type as keyof typeof PetLifeMomentType];
    if (!typeEnum) {
      throw new InvalidPetLifeMomentTypeException(type);
    }

    return new PetLifeMoment(id, typeEnum, petId, createdBy, occurredOn, description);
  }

  private getMomentTheme(type: PetLifeMomentType): PetLifeMomentTheme {
    switch (type) {
      // Celebration
      case PetLifeMomentType.Arrival:
      case PetLifeMomentType.Gift:
      case PetLifeMomentType.Anniversary:
      case PetLifeMomentType.Achievement:
      case PetLifeMomentType.Move:
        return PetLifeMomentTheme.Celebration;
      // Activity
      case PetLifeMomentType.Walk:
      case PetLifeMomentType.Exercise:
      case PetLifeMomentType.Play:
      case PetLifeMomentType.Training:
      case PetLifeMomentType.Socialization:
      case PetLifeMomentType.Excursion:
        return PetLifeMomentTheme.Activity;
      // Diet
      case PetLifeMomentType.DietChange:
      case PetLifeMomentType.SpecialMeal:
      case PetLifeMomentType.Hydration:
        return PetLifeMomentTheme.Diet;
      // Hygiene and Beauty
      case PetLifeMomentType.GroomingVisit:
      case PetLifeMomentType.Bath:
      case PetLifeMomentType.NailCut:
        return PetLifeMomentTheme.HygieneAndBeauty;
      // Health
      case PetLifeMomentType.VeterinaryVisit:
      case PetLifeMomentType.Vaccination:
      case PetLifeMomentType.Medication:
      case PetLifeMomentType.Surgery:
      case PetLifeMomentType.Illness:
      case PetLifeMomentType.Discomfort:
      case PetLifeMomentType.Injury:
        return PetLifeMomentTheme.Health;
      // Farewell
      case PetLifeMomentType.Death:
      case PetLifeMomentType.Goodbye:
        return PetLifeMomentTheme.Farewell;
      default:
        throw new InvalidPetLifeMomentTypeException(type);
    }
  }

  public getId(): string {
    return this.id;
  }

  public getTheme(): PetLifeMomentTheme {
    return this.theme;
  }

  public getType(): PetLifeMomentType {
    return this.type;
  }

  public getPetId(): string {
    return this.petId;
  }

  public getCreatedBy(): string {
    return this.createdBy;
  }

  public getOccurredOn(): Date {
    return this.occurredOn;
  }

  public getDescription(): string {
    return this.description;
  }
}
