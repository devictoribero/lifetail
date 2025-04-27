export class RegisterPetLifeMomentCommand {
  constructor(
    public readonly id: string,
    public readonly eventType: string,
    public readonly petId: string,
    public readonly createdBy: string,
    public readonly occurredOn: Date,
    public readonly description: string,
  ) {}
}
