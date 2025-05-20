import { AggregateRoot } from 'src/contexts/Shared/domain/AggregateRoot';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { LanguageCode } from 'src/contexts/Shared/domain/LanguageCode';

export class User extends AggregateRoot {
  private readonly id: UUID;
  private readonly accountId: UUID;

  private readonly nickname: StringValueObject;
  private preferredLanguage: LanguageCode;

  private readonly createdAt: DateValueObject;
  private readonly updatedAt: DateValueObject | null;
  private readonly deletedAt: DateValueObject | null;

  // Use for testing purposes only. It should not be used in the domain.
  constructor(params: {
    id: UUID;
    accountId: UUID;
    nickname: StringValueObject;
    preferredLanguage?: LanguageCode;
    createdAt: DateValueObject;
    updatedAt?: DateValueObject | null;
    deletedAt?: DateValueObject | null;
  }) {
    super();
    this.id = params.id;
    this.accountId = params.accountId;

    this.nickname = params.nickname;
    this.preferredLanguage = params.preferredLanguage || LanguageCode.English;

    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
    this.deletedAt = params.deletedAt;
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
    preferredLanguage,
    createdAt,
    updatedAt,
    deletedAt,
  }: {
    id: string;
    accountId: string;
    nickname: string;
    preferredLanguage: string;
    createdAt: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
  }): User {
    return new User({
      id: new UUID(id),
      accountId: new UUID(accountId),
      nickname: new StringValueObject(nickname),
      preferredLanguage: LanguageCode.fromPrimitives(preferredLanguage),
      createdAt: new DateValueObject(createdAt),
      updatedAt: updatedAt ? new DateValueObject(updatedAt) : null,
      deletedAt: deletedAt ? new DateValueObject(deletedAt) : null,
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

  getPreferredLanguage(): LanguageCode {
    return this.preferredLanguage;
  }

  changePreferredLanguageTo(language: LanguageCode): void {
    this.preferredLanguage = language;
  }

  getCreatedAt(): DateValueObject {
    return this.createdAt;
  }

  getUpdatedAt(): DateValueObject | null {
    return this.updatedAt;
  }

  getDeletedAt(): DateValueObject | null {
    return this.deletedAt;
  }

  toPrimitives(): any {
    return {
      id: this.getId().toString(),
      accountId: this.getAccountId().toString(),
      nickname: this.getNickname().toString(),
      preferredLanguage: this.getPreferredLanguage().toString(),
      createdAt: this.getCreatedAt().toISOString(),
      updatedAt: this.getUpdatedAt()?.toISOString() ?? null,
      deletedAt: this.getDeletedAt()?.toISOString() ?? null,
    };
  }
}
