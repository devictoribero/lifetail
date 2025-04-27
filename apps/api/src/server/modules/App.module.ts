import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppService } from '../app.service';
import { PetLifeMomentsModule } from './PetLifeMoments.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/server/graphql/schema.gql'),
      sortSchema: true,
    }),
    PetLifeMomentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
