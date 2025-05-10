import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateAccountResponse } from './CreateAccountResponse';
import { CreateAccountInput } from './CreateAccountInput';
import { CreateAccountCommandHandler } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountCommandHandler';
import { EmailAlreadyInUseException } from 'src/contexts/Lifetails/Authentication/domain/exceptions/EmailAlreadyInUseException';
import { CreateAccountCommand } from 'src/contexts/Lifetails/Authentication/application/createAccount/CreateAccountCommand';

@Resolver()
export class CreateAccountMutation {
  constructor(private readonly commandHandler: CreateAccountCommandHandler) {}

  @Mutation(() => CreateAccountResponse)
  async createAccount(@Args('input') input: CreateAccountInput): Promise<CreateAccountResponse> {
    try {
      const command = new CreateAccountCommand(input.email, input.password);
      const result = await this.commandHandler.execute(command);

      return {
        id: result.id,
      };
    } catch (error) {
      if (error instanceof EmailAlreadyInUseException) {
        throw new Error('This email is already registered.');
      }
      throw new Error(error.message ?? 'Error creating account');
    }
  }
}
