import { Query, Resolver } from '@nestjs/graphql';
import { SearchAllPetsUseCase } from '../../application/searchAll/SearchAllPetsUseCase';
import { Pet } from '../find/Pet';

@Resolver()
export class SearchAllPetsQuery {
  constructor(private readonly useCase: SearchAllPetsUseCase) {}

  @Query(() => [Pet])
  async searchAllPets(): Promise<Pet[]> {
    try {
      const pets = await this.useCase.execute();

      return pets.map((pet) => ({
        id: pet.getId(),
        name: pet.getName().toString(),
        gender: pet.getGender(),
        chipId: pet.getChipId().toString(),
        sterilized: pet.isSterilized().getValue(),
        birthDate: pet.getBirthdate().toDate(),
        memorialDate: pet.getMemorialDate()?.toDate(),
      }));
    } catch (error) {
      throw new Error(error.message ?? 'Error searching all pets');
    }
  }
}
