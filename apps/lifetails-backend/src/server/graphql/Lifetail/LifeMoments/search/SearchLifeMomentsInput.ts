import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class SearchLifeMomentsInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  petId: string;
}
