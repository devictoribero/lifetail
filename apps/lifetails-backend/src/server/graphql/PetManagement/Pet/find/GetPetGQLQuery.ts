import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GetPetQueryHandler } from 'src/contexts/PetManagement/Pet/application/get/GetPetQueryHandler';
import { GetPetQuery as GetPetQueryHandlerQuery } from 'src/contexts/PetManagement/Pet/application/get/GetPetQuery';
import { GetPetInput } from './GetPetInput';
import { Pet } from './Pet';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { PetNotFoundException } from 'src/contexts/PetManagement/Pet/domain/exceptions/PetNotFoundException';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';

@Resolver()
@UseGuards(AuthenticationRequired)
export class GetPetGQLQuery {
  constructor(private readonly queryHandler: GetPetQueryHandler) {}

  @Query(() => Pet)
  async getPet(@Args('input') input: GetPetInput, @Context() context: any): Promise<Pet> {
    const userId = context.req.user.id;
    const query = new GetPetQueryHandlerQuery(input.id);
    const pet = await this.queryHandler.handle(query);

    const petPrimitives = pet.toPrimitives();
    return {
      id: petPrimitives.id,
      species: petPrimitives.species,
      name: petPrimitives.name,
      gender: petPrimitives.gender,
      chipId: petPrimitives.chipId,
      sterilized: petPrimitives.sterilized,
      anniversaryDate: petPrimitives.anniversaryDate,
      createdAt: petPrimitives.createdAt,
      ownerId: userId,
    };
  }
}
