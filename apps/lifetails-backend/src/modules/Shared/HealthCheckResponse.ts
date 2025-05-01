import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class HealthCheckResponse {
  @Field()
  status: string;

  @Field()
  timestamp: Date;
}
