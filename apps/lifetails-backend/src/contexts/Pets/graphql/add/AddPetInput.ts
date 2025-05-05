import { Field, InputType } from '@nestjs/graphql';
import { Gender as DomainPetGender } from '../../../Shared/domain/Gender';

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
  birthDate: Date;

  @Field()
  userId: string;
}
