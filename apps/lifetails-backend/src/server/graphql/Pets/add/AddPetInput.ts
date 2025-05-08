import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Gender as DomainPetGender } from 'src/contexts/Lifetails/Shared/domain/Gender';
import { Species as DomainPetSpecies } from 'src/contexts/Lifetails/Pets/domain/entities/PetSpecies';

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
