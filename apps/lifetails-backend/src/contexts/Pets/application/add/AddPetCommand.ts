export class AddPetCommand {
  constructor(
    public readonly id: string,
    public readonly species: string,
    public readonly name: string,
    public readonly gender: string,
    public readonly chipId: string,
    public readonly sterilized: boolean,
    public readonly anniversaryDate: Date,
    public readonly userId: string,
  ) {}
}
