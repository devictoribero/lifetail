import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsUUID } from 'class-validator';
import { LifeMomentThemeGraphqlEnum } from '../graphql-types';
import { LifeMomentTypeGraphqlEnum } from '../graphql-types';

@ObjectType()
export class LifeMoment {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field(() => LifeMomentThemeGraphqlEnum)
  @IsNotEmpty()
  theme: LifeMomentThemeGraphqlEnum;

  @Field(() => LifeMomentTypeGraphqlEnum)
  @IsNotEmpty()
  type: LifeMomentTypeGraphqlEnum;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  petId: string;

  @Field()
  @IsNotEmpty()
  createdBy: string;

  @Field()
  @IsNotEmpty()
  occurredOn: string;

  @Field({ nullable: true })
  @IsOptional()
  description: string | null;
}
