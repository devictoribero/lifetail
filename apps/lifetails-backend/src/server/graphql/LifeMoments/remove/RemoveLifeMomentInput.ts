import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class RemoveLifeMomentInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
