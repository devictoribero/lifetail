import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AddPetLifeMomentResponse {
  @Field()
  id: string;

  @Field()
  success: boolean;

  @Field({ nullable: true })
  errorMessage?: string;
}