import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Gender as DomainPetGender } from 'src/Lifetails/contexts/Shared/domain/Gender';

// Register the enums for GraphQL
registerEnumType(DomainPetGender, {
  name: 'Gender',
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
  anniversaryDate: Date;
}
