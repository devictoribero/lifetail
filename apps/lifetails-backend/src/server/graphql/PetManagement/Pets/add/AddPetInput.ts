import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { Species as DomainPetSpecies } from 'src/contexts/Lifetails/Pets/domain/entities/PetSpecies';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsUUID } from 'class-validator';
import { GenderGraphqlEnum } from 'src/server/graphql/Shared/Gender';

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

  @Field(() => GenderGraphqlEnum)
  @IsNotEmpty()
  gender: GenderGraphqlEnum;

  @Field()
  @IsNotEmpty()
  sterilized: boolean;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  anniversaryDate?: Date;
}
