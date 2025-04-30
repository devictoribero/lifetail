import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindPetLifeMomentInput {
  @Field()
  id: string;
}
