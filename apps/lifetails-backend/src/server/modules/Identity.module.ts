import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Domain imports
import { PasswordHasher } from 'src/contexts/Identity/Authentication/domain/services/PasswordHasher';
import { GetUserService } from 'src/contexts/Identity/User/domain/services/GetUserService';
import {
  UserRepository,
  USER_REPOSITORY,
} from 'src/contexts/Identity/User/domain/repositories/UserRepository';

// Application imports
import { CreateAccountCommandHandler } from 'src/contexts/Identity/Account/application/createAccount/CreateAccountCommandHandler';
import { AuthenticateAccountCommandHandler } from 'src/contexts/Identity/Authentication/application/authenticateAccount/AuthenticateAccountCommandHandler';
import { RefreshTokenCommandHandler } from 'src/contexts/Identity/Authentication/application/refreshToken/RefreshTokenCommandHandler';
import { GetUserQueryHandler } from 'src/contexts/Identity/User/application/getUser/GetUserQueryHandler';
import { CreateUserCommandHandler } from 'src/contexts/Identity/User/application/createUser/CreateUserCommandHandler';
import { ChangeUserPreferredLanguageCommandHandler } from 'src/contexts/Identity/User/application/changePreferredLanguage/ChangeUserPreferredLanguageCommandHandler';

// Infrastructure imports
import { JwtTokenGenerator } from 'src/contexts/Identity/Authentication/infrastructure/services/JwtTokenGenerator';
import { PostgresqlAccountRepository } from 'src/contexts/Identity/Account/infrastructure/PostgresqlAccountRepository';
import { PostgresqlUserRepository } from 'src/contexts/Identity/User/infrastructure/PostgresqlUserRepository';

// Constants
import { ACCOUNT_REPOSITORY } from 'src/contexts/Identity/Account/domain/repositories/AccountRepository';

// Modules
import { SharedModule } from './Shared.module';

// Config
import jwtConfig from 'src/contexts/Identity/Authentication/infrastructure/config/jwt.config';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';

// GraphQL
import { AuthenticateAccountGQLMutation } from '../graphql/Identity/Authentication/authenticateAccount/AuthenticateAccountGQLMutation';
import { RefreshTokenGQLMutation } from '../graphql/Identity/Authentication/refreshToken/RefreshTokenGQLMutation';
import { CreateAccountGQLMutation } from '../graphql/Identity/Account/createAccount/CreateAccountGQLMutation';
import { ChangeUserPreferredLanguageGQLMutation } from '../graphql/Identity/User/changePreferredLanguage/ChangeUserPreferredLanguageGQLMutation';

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
  ],
  controllers: [],
  providers: [
    // Authentication providers
    CreateAccountCommandHandler,
    CreateAccountGQLMutation,
    AuthenticateAccountGQLMutation,
    AuthenticateAccountCommandHandler,
    PasswordHasher,
    RefreshTokenCommandHandler,
    RefreshTokenGQLMutation,
    JwtTokenGenerator,
    AuthenticationRequired,
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: PostgresqlAccountRepository,
    },
    // User providers
    {
      provide: USER_REPOSITORY,
      useClass: PostgresqlUserRepository,
    },
    {
      provide: GetUserService,
      useFactory: (repository: UserRepository) => {
        return new GetUserService(repository);
      },
      inject: [USER_REPOSITORY],
    },
    GetUserQueryHandler,
    CreateUserCommandHandler,
    ChangeUserPreferredLanguageCommandHandler,
    ChangeUserPreferredLanguageGQLMutation,
  ],
  exports: [
    // Authentication exports
    AuthenticateAccountGQLMutation,
    RefreshTokenGQLMutation,
    CreateAccountGQLMutation,
    CreateAccountCommandHandler,
    AuthenticateAccountCommandHandler,
    RefreshTokenCommandHandler,
    JwtTokenGenerator,
    AuthenticationRequired,

    // User exports
    CreateUserCommandHandler,
    GetUserQueryHandler,
    ChangeUserPreferredLanguageCommandHandler,
    USER_REPOSITORY,
    ChangeUserPreferredLanguageGQLMutation,
  ],
})
export class IdentityModule {}
