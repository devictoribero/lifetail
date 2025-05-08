import { EmailValueObject } from 'src/contexts/Lifetails/Shared/domain/EmailValueObject';
import { AggregateRoot } from 'src/contexts/Lifetails/Shared/domain/AggregateRoot';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { Gender } from 'src/contexts/Lifetails/Shared/domain/Gender';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';

export class User extends AggregateRoot {
  private readonly id: UUID;
  private readonly accountId: UUID;
  private readonly name: StringValueObject;
  private readonly nickname: StringValueObject;
  private readonly birthDate: DateValueObject;
  private readonly gender: Gender;
  private readonly createdAt: DateValueObject;

  // Use for testing purposes only. It should not be used in the domain.
  constructor(
    id: UUID,
    accountId: UUID,
    name: StringValueObject,
    nickname: StringValueObject,
    gender: Gender,
    birthDate: DateValueObject,
    createdAt: DateValueObject,
  ) {
    super();
    this.id = id;
    this.accountId = accountId;
    this.name = name;
    this.nickname = nickname;
    this.gender = gender;
    this.birthDate = birthDate;
    this.createdAt = createdAt;
  }

  static create(
    id: UUID,
    accountId: UUID,
    name: StringValueObject,
    nickname: StringValueObject,
    gender: Gender,
    birthDate: DateValueObject,
  ): User {
    const createdAt = new DateValueObject(new Date());
    return new User(id, accountId, name, nickname, gender, birthDate, createdAt);
  }

  getId(): UUID {
    return this.id;
  }

  getAccountId(): UUID {
    return this.accountId;
  }

  getName(): StringValueObject {
    return this.name;
  }

  getNickname(): StringValueObject {
    return this.nickname;
  }

  getGender(): Gender {
    return this.gender;
  }

  getBirthDate(): DateValueObject {
    return this.birthDate;
  }

  getCreatedAt(): DateValueObject {
    return this.createdAt;
  }

  toPrimitives(): any {
    return {
      id: this.getId().toString(),
      accountId: this.getAccountId().toString(),
      name: this.getName().toString(),
      nickname: this.getNickname().toString(),
      gender: this.getGender().toString(),
      birthDate: this.getBirthDate().toISOString(),
      createdAt: this.getCreatedAt().toISOString(),
    };
  }
}
