import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticateAccountResponse } from './AuthenticateAccountResponse';
import { AuthenticateAccountInput } from './AuthenticateAccountInput';
import { InvalidCredentialsException } from 'src/contexts/Identity/Authentication/domain/exceptions/InvalidCredentialsException';
import { AuthenticateAccountCommand } from 'src/contexts/Identity/Authentication/application/authenticateAccount/AuthenticateAccountCommand';
import { AuthenticateAccountCommandHandler } from 'src/contexts/Identity/Authentication/application/authenticateAccount/AuthenticateAccountCommandHandler';
import { JwtTokenGenerator } from 'src/contexts/Identity/Authentication/infrastructure/services/JwtTokenGenerator';
import { GetUserQuery } from 'src/contexts/Identity/Users/application/getUser/GetUserQuery';
import { GetUserQueryHandler } from 'src/contexts/Identity/Users/application/getUser/GetUserQueryHandler';
import { Public } from 'src/server/graphql/Shared/decorators/Public';

@Resolver()
export class AuthenticateAccountGQLMutation {
  constructor(
    private readonly commandHandler: AuthenticateAccountCommandHandler,
    private readonly tokenGenerator: JwtTokenGenerator,
    private readonly getUserQueryHandler: GetUserQueryHandler,
  ) {}

  @Public()
  @Mutation(() => AuthenticateAccountResponse)
  async authenticateAccount(
    @Args('input') input: AuthenticateAccountInput,
  ): Promise<AuthenticateAccountResponse> {
    try {
      const command = new AuthenticateAccountCommand(input.email, input.password);
      const accountId = await this.commandHandler.handle(command);

      const getUserQuery = new GetUserQuery(accountId);
      const user = await this.getUserQueryHandler.handle(getUserQuery);

      const payload = {
        accountId,
        userId: user.getId().toString(),
        email: input.email,
      };

      const token = await this.tokenGenerator.generateToken(payload);
      const refreshToken = await this.tokenGenerator.generateRefreshToken(payload);

      return {
        accountId,
        userId: user.getId().toString(),
        token,
        refreshToken,
      };
    } catch (error) {
      if (error instanceof InvalidCredentialsException) {
        throw new Error('Invalid email or password');
      }
      throw new Error(error.message ?? 'Error authenticating account');
    }
  }
}
