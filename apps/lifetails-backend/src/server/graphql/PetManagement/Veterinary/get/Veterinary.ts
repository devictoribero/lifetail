import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Veterinary {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
