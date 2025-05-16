import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateLifeMomentResponse {
  @Field()
  id: string;
}
