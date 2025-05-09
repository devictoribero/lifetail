import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsUUID } from 'class-validator';
import { PetLifeMomentTheme as DomainPetLifeMomentTheme } from 'src/contexts/Lifetails/PetLifeMoments/domain/entities/PetLifeMomentTheme';
import { PetLifeMomentType as DomainPetLifeMomentType } from 'src/contexts/Lifetails/PetLifeMoments/domain/entities/PetLifeMomentType';

// Register the enums for GraphQL
registerEnumType(DomainPetLifeMomentTheme, {
  name: 'PetLifeMomentTheme',
});

registerEnumType(DomainPetLifeMomentType, {
  name: 'PetLifeMomentType',
});

@ObjectType()
export class PetLifeMoment {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field(() => DomainPetLifeMomentTheme)
  @IsNotEmpty()
  theme: DomainPetLifeMomentTheme;

  @Field(() => DomainPetLifeMomentType)
  @IsNotEmpty()
  type: DomainPetLifeMomentType;

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
