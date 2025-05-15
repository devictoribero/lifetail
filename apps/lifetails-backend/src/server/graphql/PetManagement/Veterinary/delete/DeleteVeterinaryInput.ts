import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class DeleteVeterinaryInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
