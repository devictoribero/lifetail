export class ChangePetImageCommand {
  constructor(
    public readonly petId: string,
    public readonly imageKey: string,
    public readonly imageUploadedAt: Date,
  ) {}
}
