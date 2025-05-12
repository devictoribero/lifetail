import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { LifeMomentTypeGraphqlEnum } from '../graphql-types';

@InputType()
export class AddLifeMomentInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field(() => LifeMomentTypeGraphqlEnum)
  @IsNotEmpty()
  type: LifeMomentTypeGraphqlEnum;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  petId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  occurredOn?: string | null;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;
}
