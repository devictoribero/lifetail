import { DateValueObject } from './DateValueObject';

export abstract class AggregateRoot {
  protected id: string;
  protected createdAt: DateValueObject;
  protected updatedAt: DateValueObject | null;

  constructor(id: string, createdAt: DateValueObject, updatedAt: DateValueObject | null) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public abstract toPrimitives(): any;

  public getId(): string {
    return this.id;
  }

  public getCreatedAt(): DateValueObject {
    return this.createdAt;
  }

  public getUpdatedAt(): DateValueObject | null {
    return this.updatedAt;
  }
}
