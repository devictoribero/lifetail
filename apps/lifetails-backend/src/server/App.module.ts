import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppService } from './app.service';
import { PetLifeMomentsModule } from 'src/contexts/PetLifeMoments/PetLifeMoments.module';
import { PetsModule } from 'src/contexts/Pets/Pets.module';
import { UsersModule } from 'src/contexts/Users/Users.module';
import { AuthenticationModule } from 'src/contexts/Authentication/Authentication.module';
import { GraphqlModule } from 'src/contexts/Shared/Graphql.module';
import { HealthCheckQuery } from 'src/contexts/Shared/HealthCheckQuery';
import { ConfigModule } from '@nestjs/config';

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
    GraphqlModule,
    PetLifeMomentsModule,
    PetsModule,
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [AppController],
  providers: [AppService, HealthCheckQuery],
})
export class AppModule {}
