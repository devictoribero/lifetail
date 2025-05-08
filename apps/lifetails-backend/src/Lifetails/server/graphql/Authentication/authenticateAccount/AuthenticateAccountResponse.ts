import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthenticateAccountResponse {
  @Field()
  accountId: string;
}
