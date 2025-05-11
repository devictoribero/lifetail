import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsBoolean, IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { GraphQLGender } from '../../shared/Gender';

@InputType()
export class UpdatePetInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => GraphQLGender, { nullable: true })
  @IsOptional()
  gender?: GraphQLGender;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  sterilized?: boolean;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  anniversaryDate?: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  chipId?: string;
}
