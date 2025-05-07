import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateAccountResponse } from './CreateAccountResponse';
import { CreateAccountInput } from './CreateAccountInput';
import {
  CreateAccountUseCase,
  CreateAccountCommand,
} from '../../application/createAccount/CreateAccountUseCase';
import { EmailAlreadyInUseException } from '../../domain/exceptions/EmailAlreadyInUseException';

@Resolver()
export class CreateAccountMutation {
  constructor(private readonly useCase: CreateAccountUseCase) {}

  @Mutation(() => CreateAccountResponse)
  async createAccount(@Args('input') input: CreateAccountInput): Promise<CreateAccountResponse> {
    try {
      await this.useCase.execute(new CreateAccountCommand(input.email, input.password));

      return { email: input.email };
    } catch (error) {
      if (error instanceof EmailAlreadyInUseException) {
        throw new Error('This email is already registered.');
      }
      throw new Error(error.message ?? 'Error creating account');
    }
  }
}
