import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetVeterinaryInput {
  @Field(() => ID)
  id: string;
}
