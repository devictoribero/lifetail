export class UpdateLifeMomentCommand {
  constructor(
    public readonly id: string,
    public readonly description?: string,
    public readonly occurredOn?: Date,
  ) {}
}
