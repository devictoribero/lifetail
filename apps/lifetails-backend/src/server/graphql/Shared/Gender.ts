import { registerEnumType } from '@nestjs/graphql';

// GraphQL-compatible enum for Gender
export enum GenderGraphqlEnum {
  Male = 'Male',
  Female = 'Female',
}

registerEnumType(GenderGraphqlEnum, { name: 'Gender' });
