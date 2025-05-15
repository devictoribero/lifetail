import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

@InputType()
export class AddVeterinaryInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  name: string;
}
