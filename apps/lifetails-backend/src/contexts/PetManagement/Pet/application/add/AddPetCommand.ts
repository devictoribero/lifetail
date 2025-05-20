export class AddPetCommand {
  constructor(
    public readonly id: string,
    public readonly species: string,
    public readonly name: string,
    public readonly gender: string,
    public readonly sterilized: boolean,
    public readonly birthDate: Date,
    public readonly arrivalDate: Date,
    public readonly color: string,
    public readonly ownerId: string,
  ) {}
}
