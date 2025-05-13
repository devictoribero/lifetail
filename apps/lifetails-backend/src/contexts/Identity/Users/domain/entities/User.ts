import { AggregateRoot } from 'src/contexts/Shared/domain/AggregateRoot';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { Language } from 'src/contexts/Shared/domain/Language';

export class User extends AggregateRoot {
  private readonly id: UUID;
  private readonly accountId: UUID;
  private readonly nickname: StringValueObject;
  private readonly createdAt: DateValueObject;
  private preferredLanguage: Language;

  // Use for testing purposes only. It should not be used in the domain.
  constructor(
    id: UUID,
    accountId: UUID,
    nickname: StringValueObject,
    createdAt: DateValueObject,
    preferredLanguage: Language,
  ) {
    super();
    this.id = id;
    this.accountId = accountId;
    this.nickname = nickname;
    this.createdAt = createdAt;
    this.preferredLanguage = preferredLanguage;
  }

  static create(
    id: UUID,
    accountId: UUID,
    nickname: StringValueObject,
    preferredLanguage?: Language,
  ): User {
    const createdAt = new DateValueObject(new Date());
    const language = preferredLanguage || Language.English;
    return new User(id, accountId, nickname, createdAt, language);
  }

  getId(): UUID {
    return this.id;
  }

  getAccountId(): UUID {
    return this.accountId;
  }

  getNickname(): StringValueObject {
    return this.nickname;
  }

  getCreatedAt(): DateValueObject {
    return this.createdAt;
  }

  getPreferredLanguage(): Language {
    return this.preferredLanguage;
  }

  changePreferredLanguageTo(language: Language): void {
    this.preferredLanguage = language;
  }

  toPrimitives(): any {
    return {
      id: this.getId().toString(),
      accountId: this.getAccountId().toString(),
      nickname: this.getNickname().toString(),
      createdAt: this.getCreatedAt().toISOString(),
      preferredLanguage: this.getPreferredLanguage().toString(),
    };
  }
}
