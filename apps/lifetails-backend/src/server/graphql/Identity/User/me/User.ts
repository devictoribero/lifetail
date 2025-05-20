import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  accountId: string;

  @Field()
  nickname: string;

  @Field()
  preferredLanguage: string;

  @Field()
  createdAt: string;
}
