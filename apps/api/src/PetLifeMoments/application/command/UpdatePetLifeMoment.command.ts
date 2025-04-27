export class UpdatePetLifeMomentCommand {
  constructor(
    public readonly id: string,
    public readonly title?: string,
    public readonly description?: string,
    public readonly date?: Date,
    public readonly category?: string,
    public readonly imageUrl?: string,
  ) {}
}