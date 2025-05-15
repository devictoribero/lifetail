import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// Module imports
import { PetsModule } from './Pets.module';
import { LifetailsModule } from './Lifetails.module';
import { SharedModule } from './Shared.module';
import { IdentityModule } from './Identity.module';

// GraphQL resolver imports
import { HealthCheckGQLQuery } from '../graphql/HealthCheckGQLQuery';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/server/lifetails.gql'),
      sortSchema: true,
      context: ({ req }) => ({ req }),
    }),
    SharedModule,
    IdentityModule,
    PetsModule,
    LifetailsModule,
  ],
  controllers: [],
  providers: [
    // GraphQL resolvers
    HealthCheckGQLQuery,
  ],
})
export class AppModule {}
