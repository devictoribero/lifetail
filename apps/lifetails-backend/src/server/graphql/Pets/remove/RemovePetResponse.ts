import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemovePetResponse {
  @Field()
  id: string;
}
