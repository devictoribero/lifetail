export abstract class AggregateRoot {
  protected id: string;
  // protected createdAt: Date;
  // protected updatedAt: Date;

  constructor(id: string) {
    this.id = id;
  }

  public abstract toPrimitives(): any;

  public getId(): string {
    return this.id;
  }
}
