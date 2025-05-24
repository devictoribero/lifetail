import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsString, IsDateString } from 'class-validator';

@InputType()
export class ImageInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  key: string;

  @Field(() => Date)
  @IsDateString()
  @IsNotEmpty()
  uploadedAt: Date;
}

@InputType()
export class ChangePetImageInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  petId: string;

  @Field(() => ImageInput)
  @IsNotEmpty()
  image: ImageInput;
}
