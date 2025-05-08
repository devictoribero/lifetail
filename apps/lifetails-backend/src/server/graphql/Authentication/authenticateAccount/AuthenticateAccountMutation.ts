import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticateAccountResponse } from './AuthenticateAccountResponse';
import { AuthenticateAccountInput } from './AuthenticateAccountInput';
import { InvalidCredentialsException } from 'src/contexts/Lifetails/Authentication/domain/exceptions/InvalidCredentialsException';
import { AuthenticateAccountCommand } from 'src/contexts/Lifetails/Authentication/application/authenticateAccount/AuthenticateAccountCommand';
import { AuthenticateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/authenticateAccount/AuthenticateAccountCommandHandler';

@Resolver()
export class AuthenticateAccountMutation {
  constructor(private readonly commandHandler: AuthenticateAccountCommandHandler) {}

  @Mutation(() => AuthenticateAccountResponse)
  async authenticateAccount(
    @Args('input') input: AuthenticateAccountInput,
  ): Promise<AuthenticateAccountResponse> {
    try {
      const command = new AuthenticateAccountCommand(input.email, input.password);
      const accountId = await this.commandHandler.execute(command);

      return { accountId };
    } catch (error) {
      if (error instanceof InvalidCredentialsException) {
        throw new Error('Invalid email or password');
      }
      throw new Error(error.message ?? 'Error authenticating account');
    }
  }
}
