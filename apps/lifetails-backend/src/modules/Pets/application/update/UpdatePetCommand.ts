export class UpdatePetCommand {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly gender?: string,
    public readonly chipId?: string,
    public readonly sterilized?: boolean,
    public readonly birthdate?: Date,
  ) {}
}
