import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RemovePetInput {
  @Field()
  id: string;
}
