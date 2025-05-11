import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateAccountResponse } from './CreateAccountResponse';
import { CreateAccountInput } from './CreateAccountInput';
import { CreateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountCommandHandler';
import { EmailAlreadyInUseException } from 'src/contexts/Lifetails/Authentication/domain/exceptions/EmailAlreadyInUseException';
import { CreateAccountCommand } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountCommand';
import { Public } from 'src/contexts/Lifetails/Authentication/infrastructure/decorators/Public';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { CreateUserCommand } from 'src/contexts/Lifetails/Users/application/createUser/CreateUserCommand';
import { CreateUserCommandHandler } from 'src/contexts/Lifetails/Users/application/createUser/CreateUserCommandHandler';

@Resolver()
export class CreateAccountMutation {
  constructor(
    private readonly createAccountCommandHandler: CreateAccountCommandHandler,
    private readonly createUserCommandHandler: CreateUserCommandHandler,
  ) {}

  @Public()
  @Mutation(() => CreateAccountResponse)
  async createAccount(@Args('input') input: CreateAccountInput): Promise<CreateAccountResponse> {
    try {
      // Create account
      const command = new CreateAccountCommand(
        UUID.create().toString(),
        input.email,
        input.password,
      );
      const { id: accountId } = await this.createAccountCommandHandler.execute(command);

      // Create user for account
      const userId = UUID.create().toString();
      const createUserCommand = new CreateUserCommand(accountId, userId, input.nickname);
      await this.createUserCommandHandler.execute(createUserCommand);

      return { id: accountId };
    } catch (error) {
      if (error instanceof EmailAlreadyInUseException) {
        throw new Error('Email already in use');
      }
      throw new Error(error.message ?? 'Error creating account');
    }
  }
}
