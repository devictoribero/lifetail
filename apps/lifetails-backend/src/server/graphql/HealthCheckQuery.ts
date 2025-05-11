import { Query, Resolver } from '@nestjs/graphql';
import { HealthCheckResponse } from './HealthCheckResponse';
import { Public } from 'src/contexts/Lifetails/Authentication/infrastructure/decorators/Public';

@Public()
@Resolver()
export class HealthCheckQuery {
  @Query(() => HealthCheckResponse)
  healthCheck(): HealthCheckResponse {
    return {
      timestamp: new Date(),
    };
  }
}
