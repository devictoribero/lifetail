import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Gender as DomainPetGender } from 'src/Lifetails/contexts/Shared/domain/Gender';
import { Species as DomainPetSpecies } from 'src/Lifetails/contexts/Pets/domain/entities/PetSpecies';

registerEnumType(DomainPetSpecies, {
  name: 'PetSpecies',
});

@InputType()
export class AddPetInput {
  @Field()
  id: string;

  @Field(() => DomainPetSpecies)
  species: DomainPetSpecies;

  @Field()
  name: string;

  @Field(() => DomainPetGender)
  gender: DomainPetGender;

  @Field()
  chipId: string;

  @Field()
  sterilized: boolean;

  @Field(() => Date)
  anniversaryDate: Date;

  @Field()
  userId: string;
}
