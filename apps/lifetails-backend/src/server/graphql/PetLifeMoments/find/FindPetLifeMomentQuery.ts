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
      const lifeMoment = await this.queryHandler.execute(query);

      const lifeMomentPrimitive = lifeMoment.toPrimitives();
      return {
        id: lifeMomentPrimitive.id,
        theme: lifeMomentPrimitive.theme,
        type: lifeMomentPrimitive.type,
        petId: lifeMomentPrimitive.petId,
        createdBy: lifeMomentPrimitive.createdBy,
        occurredOn: lifeMomentPrimitive.occurredOn,
        description: lifeMomentPrimitive.description,
      };
    } catch (error) {
      throw new Error(error.message ?? 'Error finding pet life moment');
    }
  }
}
