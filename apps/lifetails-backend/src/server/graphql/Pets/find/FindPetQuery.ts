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
