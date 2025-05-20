import { registerEnumType } from '@nestjs/graphql';

// GraphQL-compatible enum for Gender
export enum GenderGraphqlEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

registerEnumType(GenderGraphqlEnum, { name: 'Gender' });
