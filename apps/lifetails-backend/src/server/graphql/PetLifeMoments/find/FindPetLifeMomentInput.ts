import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class FindPetLifeMomentInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
