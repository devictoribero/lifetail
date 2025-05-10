import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RemoveLifeMomentResponse {
  @Field()
  id: string;
}
