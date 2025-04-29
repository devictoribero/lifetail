import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class AddPetLifeMomentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  type: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  petId: string;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  createdBy: string;

  @Field(() => Date)
  @Transform(({ value }) => new Date(value))
  occurredOn: Date;

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;
}