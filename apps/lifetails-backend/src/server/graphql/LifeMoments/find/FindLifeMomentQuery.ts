import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindLifeMomentQueryHandler } from 'src/contexts/Lifetails/LifeMoments/application/find/FindLifeMomentQueryHandler';
import { FindLifeMomentQuery } from 'src/contexts/Lifetails/LifeMoments/application/find/FindLifeMomentQuery';
import { FindLifeMomentInput } from './FindLifeMomentInput';
import { LifeMoment } from './LifeMoment';

@Resolver()
export class FindLifeMoment {
  constructor(private readonly queryHandler: FindLifeMomentQueryHandler) {}

  @Query(() => LifeMoment)
  async findLifeMoment(@Args('input') input: FindLifeMomentInput): Promise<LifeMoment> {
    try {
      const query = new FindLifeMomentQuery(input.id);
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
      throw new Error(error.message ?? 'Error finding life moment');
    }
  }
}
