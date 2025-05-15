import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddVeterinaryResponse {
  @Field()
  id: string;
}
