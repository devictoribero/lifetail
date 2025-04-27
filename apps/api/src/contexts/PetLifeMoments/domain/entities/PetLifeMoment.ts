import { InvalidPetLifeMomentTypeException } from '../exceptions/InvalidPetLifeMomentTypeException';

export enum PetLifeMomentCategory {
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
  private category: PetLifeMomentCategory;
  private eventType: PetLifeMomentType;
  private petId: string;
  private createdBy: string;
  private occurredOn: Date;
  private description: string;

  constructor(
    id: string,
    eventType: PetLifeMomentType,
    petId: string,
    createdBy: string,
    occurredOn: Date,
    description: string,
  ) {
    this.id = id;
    this.category = this.getCategoryForEventType(eventType);
    this.eventType = eventType;
    this.petId = petId;
    this.createdBy = createdBy;
    this.occurredOn = occurredOn;
    this.description = description;
  }

  static create(
    id: string,
    eventType: string,
    petId: string,
    createdBy: string,
    occurredOn: Date,
    description: string,
  ) {
    const eventTypeEnum = PetLifeMomentType[eventType as keyof typeof PetLifeMomentType];
    if (!eventTypeEnum) {
      throw new InvalidPetLifeMomentTypeException(eventType);
    }

    return new PetLifeMoment(id, eventTypeEnum, petId, createdBy, occurredOn, description);
  }

  private getCategoryForEventType(eventType: PetLifeMomentType): PetLifeMomentCategory {
    switch (eventType) {
      // Celebration
      case PetLifeMomentType.Arrival:
      case PetLifeMomentType.Gift:
      case PetLifeMomentType.Anniversary:
      case PetLifeMomentType.Achievement:
      case PetLifeMomentType.Move:
        return PetLifeMomentCategory.Celebration;
      // Activity
      case PetLifeMomentType.Walk:
      case PetLifeMomentType.Exercise:
      case PetLifeMomentType.Play:
      case PetLifeMomentType.Training:
      case PetLifeMomentType.Socialization:
      case PetLifeMomentType.Excursion:
        return PetLifeMomentCategory.Activity;
      // Diet
      case PetLifeMomentType.DietChange:
      case PetLifeMomentType.SpecialMeal:
      case PetLifeMomentType.Hydration:
        return PetLifeMomentCategory.Diet;
      // Hygiene and Beauty
      case PetLifeMomentType.GroomingVisit:
      case PetLifeMomentType.Bath:
      case PetLifeMomentType.NailCut:
        return PetLifeMomentCategory.HygieneAndBeauty;
      // Health
      case PetLifeMomentType.VeterinaryVisit:
      case PetLifeMomentType.Vaccination:
      case PetLifeMomentType.Medication:
      case PetLifeMomentType.Surgery:
      case PetLifeMomentType.Illness:
      case PetLifeMomentType.Discomfort:
      case PetLifeMomentType.Injury:
        return PetLifeMomentCategory.Health;
      // Farewell
      case PetLifeMomentType.Death:
      case PetLifeMomentType.Goodbye:
        return PetLifeMomentCategory.Farewell;
      default:
        throw new InvalidPetLifeMomentTypeException(eventType);
    }
  }

  public getId(): string {
    return this.id;
  }

  public getCategory(): PetLifeMomentCategory {
    return this.category;
  }

  public getEventType(): PetLifeMomentType {
    return this.eventType;
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
