import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateAccountResponse } from './CreateAccountResponse';
import { CreateAccountInput } from './CreateAccountInput';
import { CreateAccountCommandHandler } from 'src/contexts/Identity/Account/application/createAccount/CreateAccountCommandHandler';
import { EmailAlreadyInUseException } from 'src/contexts/Identity/Account/domain/exceptions/EmailAlreadyInUseException';
import { CreateAccountCommand } from 'src/contexts/Identity/Account/application/createAccount/CreateAccountCommand';
import { Public } from 'src/server/graphql/Shared/decorators/Public';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { CreateUserCommand } from 'src/contexts/Identity/User/application/createUser/CreateUserCommand';
import { CreateUserCommandHandler } from 'src/contexts/Identity/User/application/createUser/CreateUserCommandHandler';

@Resolver()
export class CreateAccountGQLMutation {
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
        UUID.generate().toString(),
        input.email,
        input.password,
      );
      const { id: accountId } = await this.createAccountCommandHandler.handle(command);

      // Create user for account
      const userId = UUID.generate().toString();
      const createUserCommand = new CreateUserCommand(accountId, userId, input.nickname);
      await this.createUserCommandHandler.handle(createUserCommand);

      return { id: accountId };
    } catch (error) {
      if (error instanceof EmailAlreadyInUseException) {
        throw new Error('Email already in use');
      }
      throw new Error(error.message ?? 'Error creating account');
    }
  }
}
