import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { PetLifeMomentTheme } from './PetLifeMomentTheme';
import { PetLifeMomentType } from './PetLifeMomentType';

export class PetLifeMoment {
  private id: string;
  private type: PetLifeMomentType;
  private theme: PetLifeMomentTheme;
  private petId: string;
  private createdBy: string;
  private occurredOn: Date;
  private description: StringValueObject;

  private constructor(
    id: string,
    type: PetLifeMomentType,
    theme: PetLifeMomentTheme,
    petId: string,
    createdBy: string,
    occurredOn: Date,
    description: StringValueObject,
  ) {
    this.id = id;
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
    occurredOn: Date,
    description: StringValueObject,
  ) {
    return new PetLifeMoment(id, type, type.getTheme(), petId, createdBy, occurredOn, description);
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
  ) {
    return new PetLifeMoment(
      id,
      PetLifeMomentType.fromPrimitives(type),
      PetLifeMomentTheme.fromPrimitives(theme),
      petId,
      createdBy,
      occurredOn,
      new StringValueObject(description),
    );
  }

  public getId(): string {
    return this.id;
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

  public getOccurredOn(): Date {
    return this.occurredOn;
  }

  public getDescription(): StringValueObject {
    return this.description;
  }
}
