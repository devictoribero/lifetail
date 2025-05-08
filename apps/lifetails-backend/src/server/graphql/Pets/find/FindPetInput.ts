import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindPetInput {
  @Field()
  id: string;
}
