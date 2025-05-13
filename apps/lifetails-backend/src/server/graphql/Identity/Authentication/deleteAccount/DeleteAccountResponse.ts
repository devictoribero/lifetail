import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteAccountResponse {
  @Field(() => Boolean)
  success: boolean;
}
