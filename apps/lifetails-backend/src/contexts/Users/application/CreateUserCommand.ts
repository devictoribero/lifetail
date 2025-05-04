export class CreateUserCommand {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly name: string,
    public readonly nickname: string,
    public readonly gender: string,
    public readonly birthDate: Date,
  ) {}
}
