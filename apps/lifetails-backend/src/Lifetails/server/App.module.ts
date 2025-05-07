import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppService } from './app.service';
import { PetLifeMomentsModule } from 'src/Lifetails/contexts/PetLifeMoments/PetLifeMoments.module';
import { PetsModule } from 'src/Lifetails/contexts/Pets/Pets.module';
import { UsersModule } from 'src/Lifetails/contexts/Users/Users.module';
import { AuthenticationModule } from 'src/Lifetails/contexts/Authentication/Authentication.module';
import { GraphqlModule } from 'src/Lifetails/contexts/Shared/Graphql.module';
import { HealthCheckQuery } from 'src/Lifetails/contexts/Shared/HealthCheckQuery';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/Lifetails/server/schema.gql'),
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
