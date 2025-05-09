import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Gender as DomainPetGender } from 'src/contexts/Lifetails/Shared/domain/Gender';

// Register the enums for GraphQL
registerEnumType(DomainPetGender, {
  name: 'Gender',
});

@ObjectType()
export class Pet {
  @Field()
  id: string;

  @Field()
  species: string;

  @Field()
  name: string;

  @Field(() => DomainPetGender)
  gender: DomainPetGender;

  @Field()
  sterilized: boolean;

  @Field()
  anniversaryDate: Date;

  @Field()
  createdAt: Date;

  @Field()
  userId: string;

  @Field()
  chipId: string;
}
