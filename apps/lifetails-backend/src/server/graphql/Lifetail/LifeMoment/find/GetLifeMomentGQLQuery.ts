import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetLifeMomentQueryHandler } from 'src/contexts/Lifetails/LifeMoment/application/get/GetLifeMomentQueryHandler';
import { GetLifeMomentQuery } from 'src/contexts/Lifetails/LifeMoment/application/get/GetLifeMomentQuery';
import { GetLifeMomentInput } from './GetLifeMomentInput';
import { LifeMoment } from './LifeMoment';

@Resolver()
export class GetLifeMomentGQLQuery {
  constructor(private readonly queryHandler: GetLifeMomentQueryHandler) {}

  @Query(() => LifeMoment)
  async getLifeMoment(@Args('input') input: GetLifeMomentInput): Promise<LifeMoment> {
    const query = new GetLifeMomentQuery(input.id);
    const lifeMoment = await this.queryHandler.handle(query);

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
  }
}
