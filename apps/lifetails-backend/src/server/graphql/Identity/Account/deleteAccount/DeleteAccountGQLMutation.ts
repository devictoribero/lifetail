import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { DeleteAccountInput } from './DeleteAccountInput';
import { DeleteAccountResponse } from './DeleteAccountResponse';
import { DeleteAccountCommandHandler } from 'src/contexts/Identity/Account/application/deleteAccount/DeleteAccountCommandHandler';
import { DeleteAccountCommand } from 'src/contexts/Identity/Account/application/deleteAccount/DeleteAccountCommand';
import { UseGuards } from '@nestjs/common';
import { AccountNotFoundException } from 'src/contexts/Identity/Account/domain/exceptions/AccountNotFoundException';
import {
  AuthenticationRequired,
  UserInContext,
} from 'src/server/graphql/Shared/guards/AuthenticationRequired';

@Resolver()
export class DeleteAccountGQLMutation {
  constructor(private readonly deleteAccountCommandHandler: DeleteAccountCommandHandler) {}

  @UseGuards(AuthenticationRequired)
  @Mutation(() => DeleteAccountResponse)
  async deleteAccount(
    @Args('input') input: DeleteAccountInput,
    @Context() context: any,
  ): Promise<DeleteAccountResponse> {
    try {
      const accountId = this.getUserFromContext(context).accountId;
      const command = new DeleteAccountCommand(accountId);
      await this.deleteAccountCommandHandler.handle(command);

      return { success: true };
    } catch (error) {
      if (error instanceof AccountNotFoundException) {
        throw new Error('Account not found');
      }
      throw new Error(error.message ?? 'Error deleting account');
    }
  }

  private getUserFromContext(context: any): UserInContext {
    return context.req.user;
  }
}
