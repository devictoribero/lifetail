import { Args, Query, Resolver } from '@nestjs/graphql';
import { Pet } from '../find/Pet';
import { SearchAllPetsQueryHandler } from 'src/contexts/PetManagement/Pet/application/searchAll/SearchAllPetsQueryHandler';
import { SearchAllPetsQuery as SearchAllPetsQueryDomain } from 'src/contexts/PetManagement/Pet/application/searchAll/SearchAllPetsQuery';
import { SearchAllPetsInput } from './SearchAllPetsInput';

@Resolver()
export class SearchAllPetsGQLQuery {
  constructor(private readonly queryHandler: SearchAllPetsQueryHandler) {}

  @Query(() => [Pet])
  async searchAllPets(@Args('input') input: SearchAllPetsInput): Promise<Pet[]> {
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
        birthDate: petPrimitives.birthDate,
        arrivalDate: petPrimitives.arrivalDate,
        microchipNumber: petPrimitives.microchipNumber,
        createdAt: petPrimitives.createdAt,
        ownerId: petPrimitives.ownerId,
        color: petPrimitives.color,
        updatedAt: petPrimitives.updatedAt,
        deletedAt: petPrimitives.deletedAt,
      };
    });
  }
}
