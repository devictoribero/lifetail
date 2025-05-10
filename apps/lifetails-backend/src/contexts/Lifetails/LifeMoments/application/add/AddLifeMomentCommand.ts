export class AddLifeMomentCommand {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly petId: string,
    public readonly createdBy: string,
    public readonly occurredOn: Date,
    public readonly description: string,
  ) {}
}
