import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// Module imports
import { AuthenticationModule } from './Authentication.module';
import { GraphqlModule } from './Graphql.module';
import { PetLifeMomentsModule } from './PetLifeMoments.module';
import { PetsModule } from './Pets.module';
import { UsersModule } from './Users.module';

// GraphQL resolver imports
import { HealthCheckQuery } from '../graphql/HealthCheckQuery';
import { CreateAccountMutation } from '../graphql/Authentication/createAccount/CreateAccountMutation';
import { AuthenticateAccountMutation } from '../graphql/Authentication/authenticateAccount/AuthenticateAccountMutation';
import { AddPetMutation } from '../graphql/Pets/add/AddPetMutation';
import { RemovePetMutation } from '../graphql/Pets/remove/RemovePetMutation';
import { UpdatePetMutation } from '../graphql/Pets/update/UpdatePetMutation';
import { FindPetQuery } from '../graphql/Pets/find/FindPetQuery';
import { SearchAllPetsQuery } from '../graphql/Pets/searchAll/SearchAllPetsQuery';
import { AddPetLifeMomentMutation } from '../graphql/PetLifeMoments/add/AddPetLifeMomentMutation';
import { RemovePetLifeMomentMutation } from '../graphql/PetLifeMoments/remove/RemovePetLifeMomentMutation';
import { UpdatePetLifeMomentMutation } from '../graphql/PetLifeMoments/update/UpdatePetLifeMomentMutation';
import { FindPetLifeMoment } from '../graphql/PetLifeMoments/find/FindPetLifeMomentQuery';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/server/schema.gql'),
      sortSchema: true,
    }),
    AuthenticationModule,
    GraphqlModule,
    PetLifeMomentsModule,
    PetsModule,
    UsersModule,
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
    AddPetLifeMomentMutation,
    RemovePetLifeMomentMutation,
    UpdatePetLifeMomentMutation,
    FindPetLifeMoment,
  ],
})
export class AppModule {}
