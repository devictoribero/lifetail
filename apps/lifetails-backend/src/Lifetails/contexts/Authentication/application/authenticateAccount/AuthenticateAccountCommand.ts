export class AuthenticateAccountCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
