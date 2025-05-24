export class UpdateVeterinaryCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly address?: string,
    public readonly email?: string,
    public readonly primaryPhone?: string,
    public readonly emergencyPhone?: string,
    public readonly notes?: string,
  ) {}
}
