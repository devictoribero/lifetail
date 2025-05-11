import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
// domain imports
import { PasswordHasher } from 'src/contexts/Lifetails/Authentication/domain/services/PasswordHasher';
// Application imports
import { CreateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountCommandHandler';
import { AuthenticateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/authenticateAccount/AuthenticateAccountCommandHandler';
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
    PasswordHasher,
    AuthenticateAccountCommandHandler,
    AccountCreatedEventHandler,
    JwtTokenGenerator,
    AuthenticationRequired,
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: AccountInMemoryRepository,
    },
  ],
  exports: [
    CreateAccountCommandHandler,
    AuthenticateAccountCommandHandler,
    JwtTokenGenerator,
    AuthenticationRequired,
  ],
})
export class AuthenticationModule {}
