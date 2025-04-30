import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/findById/FindPetLifeMomentUseCase';
import {
  FindPetLifeMomentQuery as FindByIdQuery,
  FindPetLifeMomentQuery,
} from 'src/contexts/PetLifeMoments/application/findById/FindPetLifeMomentQuery';
import { FindPetLifeMomentInput } from './FindPetLifeMomentInput';
import { PetLifeMomentType } from './PetLifeMomentType';

@Resolver()
export class FindPetLifeMoment {
  constructor(private readonly findPetLifeMomentUseCase: FindPetLifeMomentUseCase) {}

  @Query(() => PetLifeMomentType)
  async findPetLifeMoment(
    @Args('input') input: FindPetLifeMomentInput,
  ): Promise<PetLifeMomentType> {
    try {
      const query = new FindPetLifeMomentQuery(input.id);
      const moment = await this.findPetLifeMomentUseCase.execute(query);

      return {
        id: moment.getId(),
        // @todo: remove the toString() from here and move it to the use case
        theme: moment.getTheme(),
        type: moment.getType(),
        petId: moment.getPetId(),
        createdBy: moment.getCreatedBy(),
        occurredOn: moment.getOccurredOn(),
        description: moment.getDescription().toString(),
      };
    } catch (error) {
      throw new Error(error.message ?? 'Error finding pet life moment');
    }
  }
}
