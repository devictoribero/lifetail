import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
// domain imports
import { PasswordHasher } from 'src/contexts/Identity/Authentication/domain/services/PasswordHasher';
// Application imports
import { CreateAccountCommandHandler } from 'src/contexts/Identity/Accounts/application/createAccount/CreateAccountCommandHandler';
import { AuthenticateAccountCommandHandler } from 'src/contexts/Identity/Authentication/application/authenticateAccount/AuthenticateAccountCommandHandler';
import { RefreshTokenCommandHandler } from 'src/contexts/Identity/Authentication/application/refreshToken/RefreshTokenCommandHandler';
// Infrastructure imports
import { AccountInMemoryRepository } from 'src/contexts/Identity/Accounts/infrastructure/AccountInMemoryRepository';
import { JwtTokenGenerator } from 'src/contexts/Identity/Authentication/infrastructure/services/JwtTokenGenerator';
// Constants
import { ACCOUNT_REPOSITORY } from 'src/contexts/Identity/Accounts/domain/repositories/AccountRepository';
// Modules
import { SharedModule } from './Shared.module';
// Config
import jwtConfig from 'src/contexts/Identity/Authentication/infrastructure/config/jwt.config';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';
import { UsersModule } from './Users.module';
import { AuthenticateAccountGQLMutation } from '../graphql/Identity/Authentication/authenticateAccount/AuthenticateAccountGQLMutation';
import { RefreshTokenGQLMutation } from '../graphql/Identity/Authentication/refreshToken/RefreshTokenGQLMutation';
import { CreateAccountGQLMutation } from '../graphql/Identity/Accounts/createAccount/CreateAccountGQLMutation';

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
    forwardRef(() => UsersModule),
  ],
  controllers: [],
  providers: [
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
      useClass: AccountInMemoryRepository,
    },
  ],
  exports: [
    AuthenticateAccountGQLMutation,
    RefreshTokenGQLMutation,
    CreateAccountGQLMutation,
    CreateAccountCommandHandler,
    AuthenticateAccountCommandHandler,
    RefreshTokenCommandHandler,
    JwtTokenGenerator,
    AuthenticationRequired,
  ],
})
export class AuthenticationModule {}
