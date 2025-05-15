import { Args, Query, Resolver } from '@nestjs/graphql';
import { Pet } from '../find/Pet';
import { SearchAllPetsQueryHandler } from 'src/contexts/PetManagement/Pets/application/searchAll/SearchAllPetsQueryHandler';
import { SearchAllPetsQuery as SearchAllPetsQueryDomain } from 'src/contexts/PetManagement/Pets/application/searchAll/SearchAllPetsQuery';
import { SearchAllPetsInput } from './SearchAllPetsInput';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class SearchAllPetsGQLQuery {
  constructor(private readonly queryHandler: SearchAllPetsQueryHandler) {}

  @Query(() => [Pet])
  async searchAllPets(@Args('input') input: SearchAllPetsInput): Promise<Pet[]> {
    try {
      const query = new SearchAllPetsQueryDomain(input.ownerId);
      const pets = await this.queryHandler.handle(query);

      return pets.map((pet) => {
        const petPrimitives = pet.toPrimitives();
        return {
          id: petPrimitives.id,
          species: petPrimitives.species,
          name: petPrimitives.name,
          gender: petPrimitives.gender,
          sterilized: petPrimitives.sterilized,
          anniversaryDate: petPrimitives.anniversaryDate,
          chipId: petPrimitives.chipId,
          createdAt: petPrimitives.createdAt,
          ownerId: petPrimitives.ownerId,
        };
      });
    } catch (error) {
      throw new Error(error.message ?? 'Error searching all pets');
    }
  }
}
