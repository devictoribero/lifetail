import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChangePetImageResponse {
  @Field()
  id: string;
}
