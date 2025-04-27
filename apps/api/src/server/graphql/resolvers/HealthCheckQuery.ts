import { Query, Resolver } from '@nestjs/graphql';
import { HealthCheckResponse } from '../types/HealthCheckResponse';

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
