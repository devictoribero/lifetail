import { AggregateRoot } from 'src/contexts/Shared/domain/AggregateRoot';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { LanguageCode } from 'src/contexts/Shared/domain/LanguageCode';

export class User extends AggregateRoot {
  private readonly id: UUID;
  private readonly accountId: UUID;
  private readonly nickname: StringValueObject;
  private readonly createdAt: DateValueObject;
  private preferredLanguage: LanguageCode;

  // Use for testing purposes only. It should not be used in the domain.
  constructor(params: {
    id: UUID;
    accountId: UUID;
    nickname: StringValueObject;
    createdAt: DateValueObject;
    preferredLanguage?: LanguageCode;
  }) {
    super();
    this.id = params.id;
    this.accountId = params.accountId;
    this.nickname = params.nickname;
    this.createdAt = params.createdAt;
    this.preferredLanguage = params.preferredLanguage || LanguageCode.English;
  }

  static create({
    id,
    accountId,
    nickname,
  }: {
    id: UUID;
    accountId: UUID;
    nickname: StringValueObject;
  }): User {
    const createdAt = new DateValueObject(new Date());
    return new User({ id, accountId, nickname, createdAt });
  }

  static fromPrimitives({
    id,
    accountId,
    nickname,
    createdAt,
    preferredLanguage,
  }: {
    id: string;
    accountId: string;
    nickname: string;
    createdAt: Date;
    preferredLanguage: string;
  }): User {
    return new User({
      id: new UUID(id),
      accountId: new UUID(accountId),
      nickname: new StringValueObject(nickname),
      createdAt: new DateValueObject(createdAt),
      preferredLanguage: LanguageCode.fromPrimitives(preferredLanguage),
    });
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

  getPreferredLanguage(): LanguageCode {
    return this.preferredLanguage;
  }

  changePreferredLanguageTo(language: LanguageCode): void {
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
