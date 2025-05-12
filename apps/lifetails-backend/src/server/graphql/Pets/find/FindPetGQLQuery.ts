import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { FindPetQueryHandler } from 'src/contexts/Lifetails/Pets/application/find/FindPetQueryHandler';
import { FindPetQuery as FindPetQueryHandlerQuery } from 'src/contexts/Lifetails/Pets/application/find/FindPetQuery';
import { FindPetInput } from './FindPetInput';
import { Pet } from './Pet';
import { NotFoundException } from '@nestjs/common';
import { PetNotFoundException } from 'src/contexts/Lifetails/Pets/domain/exceptions/PetNotFoundException';

@Resolver()
export class FindPetGQLQuery {
  constructor(private readonly queryHandler: FindPetQueryHandler) {}

  @Query(() => Pet)
  async findPet(@Args('input') input: FindPetInput, @Context() context: any): Promise<Pet> {
    try {
      const userId = context.req.user.id;
      const query = new FindPetQueryHandlerQuery(input.id);
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
      throw new Error(error.message ?? 'Error finding pet');
    }
  }
}
