import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';

// Module imports
import { AuthenticationModule } from './Authentication.module';
import { PetsModule } from './Pets.module';
import { UsersModule } from './Users.module';
import { LifeMomentsModule } from './LifeMoments.module';
import { SharedModule } from './Shared.module';

// GraphQL resolver imports
import { CreateAccountGQLMutation } from '../graphql/Authentication/createAccount/CreateAccountGQLMutation';
import { AuthenticateAccountGQLMutation } from '../graphql/Authentication/authenticateAccount/AuthenticateAccountGQLMutation';
import { RefreshTokenGQLMutation } from '../graphql/Authentication/refreshToken/RefreshTokenGQLMutation';
import { AddPetGQLMutation } from '../graphql/Pets/add/AddPetGQLMutation';
import { RemovePetGQLMutation } from '../graphql/Pets/remove/RemovePetGQLMutation';
import { UpdatePetGQLMutation } from '../graphql/Pets/update/UpdatePetGQLMutation';
import { AddLifeMomentGQLMutation } from '../graphql/LifeMoments/add/AddLifeMomentGQLMutation';
import { RemoveLifeMomentGQLMutation } from '../graphql/LifeMoments/remove/RemoveLifeMomentGQLMutation';
import { UpdateLifeMomentGQLMutation } from '../graphql/LifeMoments/update/UpdateLifeMomentGQLMutation';
import { AuthenticationRequired } from 'src/contexts/Lifetails/Authentication/infrastructure/guards/AuthenticationRequired';
import { HealthCheckGQLQuery } from '../graphql/HealthCheckGQLQuery';
import { FindPetGQLQuery } from '../graphql/Pets/find/FindPetGQLQuery';
import { SearchAllPetsGQLQuery } from '../graphql/Pets/searchAll/SearchAllPetsGQLQuery';
import { FindLifeMomentGQLQuery } from '../graphql/LifeMoments/find/FindLifeMomentGQLQuery';

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
    AuthenticationModule,
    UsersModule,
    PetsModule,
    LifeMomentsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationRequired,
    },
    // GraphQL resolvers
    HealthCheckGQLQuery,
  ],
})
export class AppModule {}
