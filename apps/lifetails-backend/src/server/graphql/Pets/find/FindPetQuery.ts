import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindPetQueryHandler } from 'src/contexts/Lifetails/Pets/application/find/FindPetQueryHandler';
import { FindPetQuery as FindPetQueryHandlerQuery } from 'src/contexts/Lifetails/Pets/application/find/FindPetQuery';
import { FindPetInput } from './FindPetInput';
import { Pet } from './Pet';

@Resolver()
export class FindPetQuery {
  constructor(private readonly queryHandler: FindPetQueryHandler) {}

  @Query(() => Pet)
  async findPet(@Args('input') input: FindPetInput): Promise<Pet> {
    try {
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
        userId: petPrimitives.userId,
      };
    } catch (error) {
      throw new Error(error.message ?? 'Error finding pet');
    }
  }
}
