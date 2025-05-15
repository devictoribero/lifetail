import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

@InputType()
export class UpdateVeterinaryInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  address?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  primaryPhone?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  emergencyPhone?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  notes?: string;
}
