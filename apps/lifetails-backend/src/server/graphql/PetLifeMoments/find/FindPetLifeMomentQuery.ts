import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindPetLifeMomentQueryHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/find/FindPetLifeMomentQueryHandler';
import { FindPetLifeMomentQuery } from 'src/contexts/Lifetails/PetLifeMoments/application/find/FindPetLifeMomentQuery';
import { FindPetLifeMomentInput } from './FindPetLifeMomentInput';
import { PetLifeMoment } from './PetLifeMoment';

@Resolver()
export class FindPetLifeMoment {
  constructor(private readonly queryHandler: FindPetLifeMomentQueryHandler) {}

  @Query(() => PetLifeMoment)
  async findPetLifeMoment(@Args('input') input: FindPetLifeMomentInput): Promise<PetLifeMoment> {
    try {
      const query = new FindPetLifeMomentQuery(input.id);
      const moment = await this.queryHandler.execute(query);

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
