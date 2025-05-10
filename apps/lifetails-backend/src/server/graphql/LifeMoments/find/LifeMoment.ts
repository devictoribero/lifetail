import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsUUID } from 'class-validator';
import { LifeMomentTheme as DomainLifeMomentTheme } from 'src/contexts/Lifetails/LifeMoments/domain/entities/LifeMomentTheme';
import { LifeMomentType as DomainLifeMomentType } from 'src/contexts/Lifetails/LifeMoments/domain/entities/LifeMomentType';

// Register the enums for GraphQL
registerEnumType(DomainLifeMomentTheme, {
  name: 'LifeMomentTheme',
});

registerEnumType(DomainLifeMomentType, {
  name: 'LifeMomentType',
});

@ObjectType()
export class LifeMoment {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field(() => DomainLifeMomentTheme)
  @IsNotEmpty()
  theme: DomainLifeMomentTheme;

  @Field(() => DomainLifeMomentType)
  @IsNotEmpty()
  type: DomainLifeMomentType;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  petId: string;

  @Field()
  @IsNotEmpty()
  createdBy: string;

  @Field()
  @IsNotEmpty()
  occurredOn: Date;

  @Field({ nullable: true })
  @IsOptional()
  description: string | null;
}
