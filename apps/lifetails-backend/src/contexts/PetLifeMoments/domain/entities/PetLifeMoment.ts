import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { PetLifeMomentTheme } from './PetLifeMomentTheme';
import { PetLifeMomentType } from './PetLifeMomentType';
import { AggregateRoot } from 'src/contexts/Shared/domain/AggregateRoot';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

export class PetLifeMoment extends AggregateRoot {
  private type: PetLifeMomentType;
  private theme: PetLifeMomentTheme;
  private petId: string;
  private createdBy: string;
  private occurredOn: DateValueObject;
  private description: StringValueObject;

  private constructor(
    id: string,
    type: PetLifeMomentType,
    theme: PetLifeMomentTheme,
    petId: string,
    createdBy: string,
    occurredOn: DateValueObject,
    description: StringValueObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject | null,
  ) {
    super(id, createdAt, updatedAt);
    this.theme = theme;
    this.type = type;
    this.petId = petId;
    this.createdBy = createdBy;
    this.occurredOn = occurredOn;
    this.description = description;
  }

  // Use to create the entity from the domain
  static create(
    id: string,
    type: PetLifeMomentType,
    petId: string,
    createdBy: string,
    occurredOn: DateValueObject,
    description: StringValueObject,
    createdAt: DateValueObject = new DateValueObject(new Date()),
    updatedAt: DateValueObject | null = null,
  ) {
    return new PetLifeMoment(
      id,
      type,
      type.getTheme(),
      petId,
      createdBy,
      occurredOn,
      description,
      createdAt,
      updatedAt,
    );
  }

  // Use to reconstruct the entity from the database
  static fromPrimitives(
    id: string,
    type: string,
    theme: string,
    petId: string,
    createdBy: string,
    occurredOn: Date,
    description: string,
    createdAt: Date = new Date(),
    updatedAt: Date | null = null,
  ) {
    return new PetLifeMoment(
      id,
      PetLifeMomentType.fromPrimitives(type),
      PetLifeMomentTheme.fromPrimitives(theme),
      petId,
      createdBy,
      new DateValueObject(occurredOn),
      new StringValueObject(description),
      new DateValueObject(createdAt),
      updatedAt ? new DateValueObject(updatedAt) : null,
    );
  }

  public getType(): PetLifeMomentType {
    return this.type;
  }

  public getTheme(): PetLifeMomentTheme {
    return this.theme;
  }

  public getPetId(): string {
    return this.petId;
  }

  public getCreatedBy(): string {
    return this.createdBy;
  }

  public getOccurredOn(): DateValueObject {
    return this.occurredOn;
  }

  public getDescription(): StringValueObject {
    return this.description;
  }

  public updateDescription(description: StringValueObject): void {
    this.description = description;
    this.updatedAt = new DateValueObject(new Date());
  }

  public reschedule(occurredOn: DateValueObject): void {
    this.occurredOn = occurredOn;
    this.updatedAt = new DateValueObject(new Date());
  }

  public reassignToCat(petId: string): void {
    this.petId = petId;
    this.updatedAt = new DateValueObject(new Date());
  }

  public toPrimitives(): any {
    return {
      id: this.id,
      type: this.type.toString(),
      theme: this.theme.toString(),
      petId: this.petId,
      createdBy: this.createdBy,
      occurredOn: this.occurredOn.toDate(),
      description: this.description.toString(),
      createdAt: this.createdAt.toDate(),
      updatedAt: this.updatedAt?.toDate() || null,
    };
  }
}
