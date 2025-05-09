import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Gender as DomainPetGender } from 'src/contexts/Lifetails/Shared/domain/Gender';
import { Species as DomainPetSpecies } from 'src/contexts/Lifetails/Pets/domain/entities/PetSpecies';
import { IsNotEmpty } from 'class-validator';
import { IsUUID } from 'class-validator';

registerEnumType(DomainPetSpecies, {
  name: 'PetSpecies',
});

@InputType()
export class AddPetInput {
  @Field()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field(() => DomainPetSpecies)
  species: DomainPetSpecies;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => DomainPetGender)
  @IsNotEmpty()
  gender: DomainPetGender;

  @Field()
  @IsNotEmpty()
  sterilized: boolean;

  @Field(() => Date)
  @IsNotEmpty()
  anniversaryDate: Date;

  @Field()
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
