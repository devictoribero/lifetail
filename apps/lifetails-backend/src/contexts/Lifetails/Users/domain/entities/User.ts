import { EmailValueObject } from 'src/contexts/Lifetails/Shared/domain/EmailValueObject';
import { AggregateRoot } from 'src/contexts/Lifetails/Shared/domain/AggregateRoot';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { Gender } from 'src/contexts/Lifetails/Shared/domain/Gender';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { Language } from 'src/contexts/Lifetails/Shared/domain/Language';

export class User extends AggregateRoot {
  private readonly id: UUID;
  private readonly accountId: UUID;
  private readonly nickname: StringValueObject;
  private readonly createdAt: DateValueObject;
  private readonly preferredLanguage: Language;

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
