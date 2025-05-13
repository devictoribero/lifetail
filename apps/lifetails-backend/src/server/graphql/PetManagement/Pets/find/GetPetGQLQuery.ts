import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GetPetQueryHandler } from 'src/contexts/Lifetails/Pets/application/get/GetPetQueryHandler';
import { GetPetQuery as GetPetQueryHandlerQuery } from 'src/contexts/Lifetails/Pets/application/get/GetPetQuery';
import { GetPetInput } from './GetPetInput';
import { Pet } from './Pet';
import { NotFoundException } from '@nestjs/common';
import { PetNotFoundException } from 'src/contexts/Lifetails/Pets/domain/exceptions/PetNotFoundException';

@Resolver()
export class GetPetGQLQuery {
  constructor(private readonly queryHandler: GetPetQueryHandler) {}

  @Query(() => Pet)
  async getPet(@Args('input') input: GetPetInput, @Context() context: any): Promise<Pet> {
    try {
      const userId = context.req.user.id;
      const query = new GetPetQueryHandlerQuery(input.id);
      const pet = await this.queryHandler.execute(query);
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
    } catch (error) {
      if (error instanceof PetNotFoundException) {
        throw new NotFoundException('Pet not found');
      }
      throw new Error(error.message ?? 'Error getting pet');
    }
  }
}
