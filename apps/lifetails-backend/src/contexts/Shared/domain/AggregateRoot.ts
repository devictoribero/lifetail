export abstract class AggregateRoot {
  protected id: string;
  protected createdAt: Date;
  protected updatedAt: Date | null;

  constructor(id: string, createdAt: Date, updatedAt: Date | null) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public abstract toPrimitives(): any;

  public getId(): string {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date | null {
    return this.updatedAt;
  }
}
