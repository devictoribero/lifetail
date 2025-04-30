import { Query, Resolver } from '@nestjs/graphql';
import { HealthCheckResponse } from './HealthCheckResponse';

@Resolver()
export class HealthCheckQuery {
  @Query(() => HealthCheckResponse)
  healthCheck(): HealthCheckResponse {
    return {
      status: 'ok',
      timestamp: new Date(),
    };
  }
}
