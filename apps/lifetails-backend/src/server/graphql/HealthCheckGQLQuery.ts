import { Query, Resolver } from '@nestjs/graphql';
import { HealthCheckResponse } from './HealthCheckResponse';
import { Public } from 'src/server/graphql/Shared/decorators/Public';

@Public()
@Resolver()
export class HealthCheckGQLQuery {
  @Query(() => HealthCheckResponse)
  healthCheck(): HealthCheckResponse {
    return {
      timestamp: new Date(),
    };
  }
}
