import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class UpdatePetLifeMomentInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  occurredOn?: Date;

  @Field({ nullable: true })
  @IsUUID()
  @IsOptional()
  petId?: string;
}
