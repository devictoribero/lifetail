import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  PetLifeMomentTheme,
  PetLifeMomentType as DomainPetLifeMomentType,
} from 'src/contexts/PetLifeMoments/domain/entities/PetLifeMoment';

// Register the enums for GraphQL
registerEnumType(PetLifeMomentTheme, {
  name: 'PetLifeMomentTheme',
});

registerEnumType(DomainPetLifeMomentType, {
  name: 'PetLifeMomentType',
});

@ObjectType()
export class PetLifeMomentType {
  @Field()
  id: string;

  @Field(() => PetLifeMomentTheme)
  theme: PetLifeMomentTheme;

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
