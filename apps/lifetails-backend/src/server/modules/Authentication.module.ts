import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
// domain imports
import { PasswordHasher } from 'src/contexts/Lifetails/Authentication/domain/services/PasswordHasher';
// Application imports
import { CreateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountCommandHandler';
import { AuthenticateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/authenticateAccount/AuthenticateAccountCommandHandler';
import { RefreshTokenCommandHandler } from 'src/contexts/Lifetails/Authentication/application/refreshToken/RefreshTokenCommandHandler';
// Infrastructure imports
import { AccountInMemoryRepository } from 'src/contexts/Lifetails/Authentication/infrastructure/AccountInMemoryRepository';
import { AccountCreatedEventHandler } from 'src/contexts/Lifetails/Authentication/infrastructure/EventHandlers/AccountCreatedEventHandler';
import { JwtTokenGenerator } from 'src/contexts/Lifetails/Authentication/infrastructure/services/JwtTokenGenerator';
// Constants
import { ACCOUNT_REPOSITORY } from 'src/contexts/Lifetails/Authentication/domain/repositories/AccountRepository';
// Modules
import { SharedModule } from './Shared.module';
// Config
import jwtConfig from 'src/contexts/Lifetails/Authentication/infrastructure/config/jwt.config';
import { AuthenticationRequired } from 'src/contexts/Lifetails/Authentication/infrastructure/guards/AuthenticationRequired';
import { UsersModule } from './Users.module';
import { AuthenticateAccountMutation } from '../graphql/Authentication/authenticateAccount/AuthenticateAccountMutation';
import { RefreshTokenMutation } from '../graphql/Authentication/refreshToken/RefreshTokenMutation';
import { CreateAccountMutation } from '../graphql/Authentication/createAccount/CreateAccountMutation';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.accessTokenExpiresIn'),
        },
      }),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [
    CreateAccountCommandHandler,
    CreateAccountMutation,
    AuthenticateAccountMutation,
    AuthenticateAccountCommandHandler,
    PasswordHasher,
    RefreshTokenCommandHandler,
    RefreshTokenMutation,
    AccountCreatedEventHandler,
    JwtTokenGenerator,
    AuthenticationRequired,
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: AccountInMemoryRepository,
    },
  ],
  exports: [
    AuthenticateAccountMutation,
    RefreshTokenMutation,
    CreateAccountMutation,
    CreateAccountCommandHandler,
    AuthenticateAccountCommandHandler,
    RefreshTokenCommandHandler,
    JwtTokenGenerator,
    AuthenticationRequired,
  ],
})
export class AuthenticationModule {}
