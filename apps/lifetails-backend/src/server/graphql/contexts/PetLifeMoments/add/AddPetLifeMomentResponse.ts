import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddPetLifeMomentResponse {
  @Field()
  id: string;
}
