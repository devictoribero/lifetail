import { Module } from '@nestjs/common';
import { DateScalar } from '../graphql/Shared/DateScalar';

@Module({
  providers: [DateScalar],
  exports: [DateScalar],
})
export class GraphqlModule {}
