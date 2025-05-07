import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindPetUseCase } from '../../application/find/FindPetUseCase';
import { FindPetQuery as FindPetUseCaseQuery } from '../../application/find/FindPetQuery';
import { FindPetInput } from './FindPetInput';
import { Pet } from './Pet';

@Resolver()
export class FindPetQuery {
  constructor(private readonly useCase: FindPetUseCase) {}

  @Query(() => Pet)
  async findPet(@Args('input') input: FindPetInput): Promise<Pet> {
    try {
      const query = new FindPetUseCaseQuery(input.id);
      const pet = await this.useCase.execute(query);

      return {
        id: pet.getId(),
        name: pet.getName().toString(),
        gender: pet.getGender(),
        chipId: pet.getChipId().toString(),
        sterilized: pet.isSterilized().getValue(),
        anniversaryDate: pet.getAnniversaryDate().toDate(),
      };
    } catch (error) {
      throw new Error(error.message ?? 'Error finding pet');
    }
  }
}
