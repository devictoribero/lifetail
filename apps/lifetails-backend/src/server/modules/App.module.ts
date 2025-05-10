import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// Module imports
import { AuthenticationModule } from './Authentication.module';
import { GraphqlModule } from './Graphql.module';
import { PetsModule } from './Pets.module';
import { UsersModule } from './Users.module';
import { LifeMomentsModule } from './LifeMoments.module';
import { SharedModule } from './Shared.module';

// GraphQL resolver imports
import { HealthCheckQuery } from '../graphql/HealthCheckQuery';
import { CreateAccountMutation } from '../graphql/Authentication/createAccount/CreateAccountMutation';
import { AuthenticateAccountMutation } from '../graphql/Authentication/authenticateAccount/AuthenticateAccountMutation';
import { AddPetMutation } from '../graphql/Pets/add/AddPetMutation';
import { RemovePetMutation } from '../graphql/Pets/remove/RemovePetMutation';
import { UpdatePetMutation } from '../graphql/Pets/update/UpdatePetMutation';
import { FindPetQuery } from '../graphql/Pets/find/FindPetQuery';
import { SearchAllPetsQuery } from '../graphql/Pets/searchAll/SearchAllPetsQuery';
import { AddLifeMomentMutation } from '../graphql/LifeMoments/add/AddLifeMomentMutation';
import { RemoveLifeMomentMutation } from '../graphql/LifeMoments/remove/RemoveLifeMomentMutation';
import { UpdateLifeMomentMutation } from '../graphql/LifeMoments/update/UpdateLifeMomentMutation';
import { FindLifeMoment } from '../graphql/LifeMoments/find/FindLifeMomentQuery';

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
    }),
    SharedModule,
    GraphqlModule,
    AuthenticationModule,
    UsersModule,
    PetsModule,
    LifeMomentsModule,
  ],
  controllers: [],
  providers: [
    // GraphQL resolvers
    HealthCheckQuery,
    CreateAccountMutation,
    AuthenticateAccountMutation,
    AddPetMutation,
    RemovePetMutation,
    UpdatePetMutation,
    FindPetQuery,
    SearchAllPetsQuery,
    AddLifeMomentMutation,
    RemoveLifeMomentMutation,
    UpdateLifeMomentMutation,
    FindLifeMoment,
  ],
})
export class AppModule {}
