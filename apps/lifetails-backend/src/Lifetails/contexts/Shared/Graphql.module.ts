import { Module } from '@nestjs/common';
import { DateScalar } from './graphql/DateScalar';

@Module({
  providers: [DateScalar],
  exports: [DateScalar],
})
export class GraphqlModule {}
