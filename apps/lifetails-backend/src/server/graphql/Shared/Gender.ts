import { registerEnumType } from '@nestjs/graphql';

// GraphQL-compatible enum for Gender
export enum GraphQLGender {
  Male = 'Male',
  Female = 'Female',
}

// Register the enum with GraphQL only once
registerEnumType(GraphQLGender, { name: 'Gender' });
