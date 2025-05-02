import { Field, InputType } from '@nestjs/graphql';
import { PetGender as DomainPetGender } from '../../domain/entities/PetGender';

@InputType()
export class UpdatePetInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => DomainPetGender, { nullable: true })
  gender?: DomainPetGender;

  @Field({ nullable: true })
  chipId?: string;

  @Field({ nullable: true })
  sterilized?: boolean;

  @Field({ nullable: true })
  birthDate?: Date;
}
