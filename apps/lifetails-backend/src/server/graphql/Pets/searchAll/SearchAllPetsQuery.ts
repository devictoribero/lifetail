import { Args, Query, Resolver } from '@nestjs/graphql';
import { Pet } from '../find/Pet';
import { SearchAllPetsQueryHandler } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsQueryHandler';
import { SearchAllPetsQuery as SearchAllPetsQueryDomain } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsQuery';
import { SearchAllPetsInput } from './SearchAllPetsInput';

@Resolver()
export class SearchAllPetsQuery {
  constructor(private readonly queryHandler: SearchAllPetsQueryHandler) {}

  @Query(() => [Pet])
  async searchAllPets(@Args('input') input: SearchAllPetsInput): Promise<Pet[]> {
    try {
      const query = new SearchAllPetsQueryDomain(input.ownerId);
      const pets = await this.queryHandler.execute(query);

      return pets.map((pet) => {
        const petPrimitives = pet.toPrimitives();
        return {
          id: petPrimitives.id,
          name: petPrimitives.name,
          gender: petPrimitives.gender,
          chipId: petPrimitives.chipId,
          sterilized: petPrimitives.sterilized,
          anniversaryDate: petPrimitives.anniversaryDate,
          createdAt: petPrimitives.createdAt,
          userId: petPrimitives.userId,
          species: petPrimitives.species,
        };
      });
    } catch (error) {
      throw new Error(error.message ?? 'Error searching all pets');
    }
  }
}
