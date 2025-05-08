import { Args, Query, Resolver } from '@nestjs/graphql';
import { Pet } from '../find/Pet';
import { SearchAllPetsUseCase } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsUseCase';
import { SearchAllPetsQuery as SearchAllPetsQueryDomain } from 'src/contexts/Lifetails/Pets/application/searchAll/SearchAllPetsQuery';

@Resolver()
export class SearchAllPetsQuery {
  constructor(private readonly useCase: SearchAllPetsUseCase) {}

  @Query(() => [Pet])
  async searchAllPets(@Args('userId') userId: string): Promise<Pet[]> {
    try {
      const query = new SearchAllPetsQueryDomain(userId);
      const pets = await this.useCase.execute(query);

      return pets.map((pet) => ({
        id: pet.getId(),
        name: pet.getName().toString(),
        gender: pet.getGender(),
        chipId: pet.getChipId().toString(),
        sterilized: pet.isSterilized().getValue(),
        anniversaryDate: pet.getAnniversaryDate().toDate(),
      }));
    } catch (error) {
      throw new Error(error.message ?? 'Error searching all pets');
    }
  }
}
