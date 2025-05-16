export class CreateUserCommand {
  constructor(
    public readonly accountId: string,
    public readonly id: string,
    public readonly nickname: string,
  ) {}
}
