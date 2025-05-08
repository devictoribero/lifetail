import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticateAccountResponse } from './AuthenticateAccountResponse';
import { AuthenticateAccountInput } from './AuthenticateAccountInput';
import { AuthenticateAccountUseCase } from 'src/Lifetails/contexts/Authentication/application/authenticateAccount/AuthenticateAccountUseCase';
import { InvalidCredentialsException } from 'src/Lifetails/contexts/Authentication/domain/exceptions/InvalidCredentialsException';
import { AuthenticateAccountCommand } from 'src/Lifetails/contexts/Authentication/application/authenticateAccount/AuthenticateAccountCommand';

@Resolver()
export class AuthenticateAccountMutation {
  constructor(private readonly useCase: AuthenticateAccountUseCase) {}

  @Mutation(() => AuthenticateAccountResponse)
  async authenticateAccount(
    @Args('input') input: AuthenticateAccountInput,
  ): Promise<AuthenticateAccountResponse> {
    try {
      const command = new AuthenticateAccountCommand(input.email, input.password);
      const accountId = await this.useCase.execute(command);

      return { accountId };
    } catch (error) {
      if (error instanceof InvalidCredentialsException) {
        throw new Error('Invalid email or password');
      }
      throw new Error(error.message ?? 'Error authenticating account');
    }
  }
}
