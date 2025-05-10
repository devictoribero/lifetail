import { Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { IsUUID } from 'class-validator';

@ObjectType()
export class AddLifeMomentResponse {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
