import { registerEnumType } from '@nestjs/graphql';

// GraphQL-compatible enum for Gender
export enum GenderGraphqlEnum {
  Male = 'Male',
  Female = 'Female',
}

// Register the enum with GraphQL only once
registerEnumType(GenderGraphqlEnum, { name: 'Gender' });
