import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class SearchAllPetsInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  ownerId: string;
}
