import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateAccountResponse {
  @Field()
  id: string;
}
