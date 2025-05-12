import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsBoolean, IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { GenderGraphqlEnum } from '../../shared/Gender';

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

  @Field(() => GenderGraphqlEnum, { nullable: true })
  @IsOptional()
  gender?: GenderGraphqlEnum;

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
