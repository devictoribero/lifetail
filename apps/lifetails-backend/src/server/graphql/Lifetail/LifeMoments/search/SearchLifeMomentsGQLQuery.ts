import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchLifeMomentsQueryHandler } from 'src/contexts/Lifetails/LifeMoments/application/search/SearchLifeMomentsQueryHandler';
import { SearchLifeMomentsQuery } from 'src/contexts/Lifetails/LifeMoments/application/search/SearchLifeMomentsQuery';
import { AuthenticationRequired } from 'src/contexts/Identity/Authentication/infrastructure/guards/AuthenticationRequired';
import { SearchLifeMomentsInput } from './SearchLifeMomentsInput';
import { LifeMoment } from '../find/LifeMoment';

@Resolver()
export class SearchLifeMomentsGQLQuery {
  constructor(private readonly queryHandler: SearchLifeMomentsQueryHandler) {}

  @UseGuards(AuthenticationRequired)
  @Query(() => [LifeMoment])
  async searchLifeMoments(@Args('input') input: SearchLifeMomentsInput): Promise<LifeMoment[]> {
    try {
      const query = new SearchLifeMomentsQuery(input.petId);
      const lifeMoments = await this.queryHandler.execute(query);

      return lifeMoments.map((lifeMoment) => {
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
      });
    } catch (error) {
      throw new Error(error.message ?? 'Error searching life moments');
    }
  }
}
