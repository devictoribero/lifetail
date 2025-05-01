import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdatePetResponse {
  @Field()
  id: string;
}
