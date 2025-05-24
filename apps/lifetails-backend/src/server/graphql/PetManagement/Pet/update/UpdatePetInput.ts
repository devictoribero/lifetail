import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsBoolean, IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { GenderGraphqlEnum } from 'src/server/graphql/Shared/Gender';
import { ImageInput } from '../changeImage/ChangePetImageInput';

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
  birthDate?: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  arrivalDate?: Date;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  microchipNumber?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  color?: string;

  @Field(() => ImageInput, { nullable: true })
  @IsOptional()
  image?: ImageInput;
}
