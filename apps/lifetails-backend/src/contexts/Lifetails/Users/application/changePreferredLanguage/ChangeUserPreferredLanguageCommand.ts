export class ChangeUserPreferredLanguageCommand {
  constructor(
    readonly userId: string,
    readonly languageCode: string,
  ) {}
}
