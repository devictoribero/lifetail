import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { LifeMomentTheme } from './LifeMomentTheme';
import { LifeMomentType } from './LifeMomentType';
import { AggregateRoot } from 'src/contexts/Shared/domain/AggregateRoot';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { UUID } from 'src/contexts/Shared/domain/UUID';

export class LifeMoment extends AggregateRoot {
  private id: UUID;
  private createdAt: DateValueObject;
  private updatedAt: DateValueObject | null;
  private type: LifeMomentType;
  private theme: LifeMomentTheme;
  private petId: UUID;
  private createdBy: UUID;
  private occurredOn: DateValueObject;
  private description: StringValueObject;

  // Use for testing purposes only. It should not be used in the domain.
  constructor(
    id: UUID,
    type: LifeMomentType,
    theme: LifeMomentTheme,
    petId: UUID,
    createdBy: UUID,
    occurredOn: DateValueObject,
    description: StringValueObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject | null = null,
  ) {
    super();
    this.id = id;
    this.theme = theme;
    this.type = type;
    this.petId = petId;
    this.createdBy = createdBy;
    this.occurredOn = occurredOn;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Use to create the entity from the domain
  static create(
    id: UUID,
    type: LifeMomentType,
    petId: UUID,
    createdBy: UUID,
    occurredOn: DateValueObject,
    description: StringValueObject,
  ) {
    const now = new DateValueObject(new Date());
    return new LifeMoment(
      id,
      type,
      type.getTheme(),
      petId,
      createdBy,
      occurredOn,
      description,
      now,
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
    return new LifeMoment(
      new UUID(id),
      LifeMomentType.fromPrimitives(type),
      LifeMomentTheme.fromPrimitives(theme),
      new UUID(petId),
      new UUID(createdBy),
      new DateValueObject(occurredOn),
      new StringValueObject(description),
      new DateValueObject(createdAt),
      updatedAt ? new DateValueObject(updatedAt) : null,
    );
  }

  public getId(): UUID {
    return this.id;
  }

  public getCreatedAt(): DateValueObject {
    return this.createdAt;
  }

  public getUpdatedAt(): DateValueObject | null {
    return this.updatedAt;
  }

  public getType(): LifeMomentType {
    return this.type;
  }

  public getTheme(): LifeMomentTheme {
    return this.theme;
  }

  public getPetId(): UUID {
    return this.petId;
  }

  public getCreatedBy(): UUID {
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

  public toPrimitives(): any {
    return {
      id: this.id.toString(),
      type: this.type.toString(),
      theme: this.theme.toString(),
      petId: this.petId.toString(),
      createdBy: this.createdBy.toString(),
      occurredOn: this.occurredOn.toISOString(),
      description: this.description.toString(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt?.toISOString() || null,
    };
  }
}
