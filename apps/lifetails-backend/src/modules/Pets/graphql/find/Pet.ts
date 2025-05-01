import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PetGender as DomainPetGender } from '../../domain/entities/PetGender';

// Register the enums for GraphQL
registerEnumType(DomainPetGender, {
  name: 'PetGender',
});

@ObjectType()
export class Pet {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => DomainPetGender)
  gender: DomainPetGender;

  @Field()
  chipId: string;

  @Field()
  sterilized: boolean;

  @Field()
  birthdate: Date;
}
