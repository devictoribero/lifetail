import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteVeterinaryResponse {
  @Field()
  id: string;

  @Field()
  success: boolean;
}
