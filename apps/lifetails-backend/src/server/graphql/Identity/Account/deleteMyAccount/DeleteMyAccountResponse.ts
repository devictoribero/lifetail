import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteMyAccountResponse {
  @Field(() => Boolean)
  success: boolean;
}
