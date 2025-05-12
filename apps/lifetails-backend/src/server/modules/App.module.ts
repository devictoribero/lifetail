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
import { CreateAccountMutation } from '../graphql/Authentication/createAccount/CreateAccountMutation';
import { AuthenticateAccountMutation } from '../graphql/Authentication/authenticateAccount/AuthenticateAccountMutation';
import { RefreshTokenMutation } from '../graphql/Authentication/refreshToken/RefreshTokenMutation';
import { AddPetMutation } from '../graphql/Pets/add/AddPetMutation';
import { RemovePetMutation } from '../graphql/Pets/remove/RemovePetMutation';
import { UpdatePetMutation } from '../graphql/Pets/update/UpdatePetMutation';
import { AddLifeMomentMutation } from '../graphql/LifeMoments/add/AddLifeMomentMutation';
import { RemoveLifeMomentMutation } from '../graphql/LifeMoments/remove/RemoveLifeMomentMutation';
import { UpdateLifeMomentMutation } from '../graphql/LifeMoments/update/UpdateLifeMomentMutation';
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
