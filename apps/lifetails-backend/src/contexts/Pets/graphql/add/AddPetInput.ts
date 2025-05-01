import { Field, InputType } from '@nestjs/graphql';
import { PetGender as DomainPetGender } from '../../domain/entities/PetGender';

@InputType()
export class AddPetInput {
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
