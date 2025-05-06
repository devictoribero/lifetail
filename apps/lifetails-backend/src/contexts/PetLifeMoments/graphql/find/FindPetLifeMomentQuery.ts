import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/find/FindPetLifeMomentUseCase';
import { FindPetLifeMomentQuery } from 'src/contexts/PetLifeMoments/application/find/FindPetLifeMomentQuery';
import { FindPetLifeMomentInput } from './FindPetLifeMomentInput';
import { PetLifeMoment } from './PetLifeMoment';

@Resolver()
export class FindPetLifeMoment {
  constructor(private readonly useCase: FindPetLifeMomentUseCase) {}

  @Query(() => PetLifeMoment)
  async findPetLifeMoment(@Args('input') input: FindPetLifeMomentInput): Promise<PetLifeMoment> {
    try {
      const query = new FindPetLifeMomentQuery(input.id);
      const moment = await this.useCase.execute(query);

      return {
        id: moment.getId(),
        theme: moment.getTheme(),
        type: moment.getType(),
        petId: moment.getPetId(),
        createdBy: moment.getCreatedBy(),
        occurredOn: moment.getOccurredOn().toDate(),
        description: moment.getDescription().toString(),
      };
    } catch (error) {
      throw new Error(error.message ?? 'Error finding pet life moment');
    }
  }
}
