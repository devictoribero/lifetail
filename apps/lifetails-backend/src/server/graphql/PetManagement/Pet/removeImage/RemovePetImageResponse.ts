import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemovePetImageResponse {
  @Field()
  id: string;
}
