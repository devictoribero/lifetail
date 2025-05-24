import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { LifeMomentTheme } from './LifeMomentTheme';
import { LifeMomentType } from './LifeMomentType';
import { AggregateRoot } from 'src/contexts/Shared/domain/AggregateRoot';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { UUID } from 'src/contexts/Shared/domain/UUID';

export class LifeMoment extends AggregateRoot {
  private id: UUID;
  private createdAt: DateValueObject;
  private type: LifeMomentType;
  private theme: LifeMomentTheme;
  private petId: UUID;
  private occurredOn: DateValueObject;
  private description: StringValueObject;
  private createdBy: UUID;
  private updatedAt: DateValueObject | null;
  private deletedAt: DateValueObject | null;

  // Use for testing purposes only. It should not be used in the domain.
  constructor(params: {
    id: UUID;
    type: LifeMomentType;
    theme: LifeMomentTheme;
    petId: UUID;
    createdBy: UUID;
    occurredOn: DateValueObject;
    description: StringValueObject;
    createdAt: DateValueObject;
    updatedAt?: DateValueObject | null;
    deletedAt?: DateValueObject | null;
  }) {
    super();
    this.id = params.id;
    this.theme = params.theme;
    this.type = params.type;
    this.petId = params.petId;
    this.createdBy = params.createdBy;
    this.occurredOn = params.occurredOn;
    this.description = params.description;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt ?? null;
    this.deletedAt = params.deletedAt ?? null;
  }

  // Use to create the entity from the domain
  static create({
    id,
    type,
    petId,
    createdBy,
    occurredOn,
    description,
  }: {
    id: UUID;
    type: LifeMomentType;
    petId: UUID;
    createdBy: UUID;
    occurredOn: DateValueObject;
    description: StringValueObject;
  }) {
    const now = new DateValueObject(new Date());
    return new LifeMoment({
      id,
      type,
      theme: type.getTheme(),
      petId,
      createdBy,
      occurredOn,
      description,
      createdAt: now,
      updatedAt: null,
      deletedAt: null,
    });
  }

  // Use to reconstruct the entity from the database
  static fromPrimitives({
    id,
    type,
    theme,
    petId,
    createdBy,
    occurredOn,
    description,
    createdAt = new Date(),
    updatedAt = null,
    deletedAt = null,
  }: {
    id: string;
    type: string;
    theme: string;
    petId: string;
    createdBy: string;
    occurredOn: Date;
    description: string;
    createdAt?: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
  }) {
    return new LifeMoment({
      id: new UUID(id),
      type: LifeMomentType.fromPrimitives(type),
      theme: LifeMomentTheme.fromPrimitives(theme),
      petId: new UUID(petId),
      createdBy: new UUID(createdBy),
      occurredOn: new DateValueObject(occurredOn),
      description: new StringValueObject(description),
      createdAt: new DateValueObject(createdAt),
      updatedAt: updatedAt ? new DateValueObject(updatedAt) : null,
      deletedAt: deletedAt ? new DateValueObject(deletedAt) : null,
    });
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

  public getDeletedAt(): DateValueObject | null {
    return this.deletedAt;
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

  public markAsDeleted(): void {
    const now = new DateValueObject(new Date());
    this.updatedAt = now;
    this.deletedAt = now;
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
      deletedAt: this.deletedAt?.toISOString() || null,
    };
  }
}
