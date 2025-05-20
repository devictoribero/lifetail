export class UpdatePetCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly gender?: string,
    public readonly sterilized?: boolean,
    public readonly birthDate?: Date,
    public readonly arrivalDate?: Date,
    public readonly microchipNumber?: string,
    public readonly color?: string,
  ) {}
}
