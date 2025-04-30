import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdatePetLifeMomentResponse {
  @Field()
  id: string;
}
