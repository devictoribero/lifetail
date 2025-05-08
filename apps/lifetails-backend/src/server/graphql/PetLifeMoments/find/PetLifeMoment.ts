import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
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
  id: string;

  @Field(() => DomainPetLifeMomentTheme)
  theme: DomainPetLifeMomentTheme;

  @Field(() => DomainPetLifeMomentType)
  type: DomainPetLifeMomentType;

  @Field()
  petId: string;

  @Field()
  createdBy: string;

  @Field()
  occurredOn: Date;

  @Field()
  description: string;
}
