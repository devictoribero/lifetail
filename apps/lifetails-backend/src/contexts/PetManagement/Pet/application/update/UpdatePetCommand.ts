export class UpdatePetCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly gender?: string,
    public readonly microchipNumber?: string,
    public readonly sterilized?: boolean,
    public readonly anniversaryDate?: Date,
    public readonly color?: string,
  ) {}
}
