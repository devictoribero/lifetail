import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddPetResponse {
  @Field()
  id: string;
}
