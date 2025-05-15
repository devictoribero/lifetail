import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateVeterinaryResponse {
  @Field()
  id: string;
}
