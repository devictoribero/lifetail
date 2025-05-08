import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemovePetLifeMomentInput {
  @Field()
  id: string;
}