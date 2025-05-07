export class UpdatePetLifeMomentCommand {
  constructor(
    public readonly id: string,
    public readonly description?: string,
    public readonly occurredOn?: Date,
    public readonly petId?: string,
  ) {}
}
