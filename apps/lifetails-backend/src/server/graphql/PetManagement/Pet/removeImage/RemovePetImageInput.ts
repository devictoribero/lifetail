import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class RemovePetImageInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  petId: string;
}
