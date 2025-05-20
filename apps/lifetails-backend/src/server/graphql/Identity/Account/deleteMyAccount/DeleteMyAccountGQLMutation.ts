import { Context, Mutation, Resolver } from '@nestjs/graphql';
import { DeleteAccountCommandHandler } from 'src/contexts/Identity/Account/application/deleteAccount/DeleteAccountCommandHandler';
import { DeleteAccountCommand } from 'src/contexts/Identity/Account/application/deleteAccount/DeleteAccountCommand';
import { UseGuards } from '@nestjs/common';
import {
  AuthenticationRequired,
  UserInContext,
} from 'src/server/graphql/Shared/guards/AuthenticationRequired';
import { DeleteMyAccountResponse } from './DeleteMyAccountResponse';
import { GetAccountQueryHandler } from 'src/contexts/Identity/Account/application/getAccount/GetAccountQueryHandler';

@Resolver()
export class DeleteMyAccountGQLMutation {
  constructor(
    private readonly deleteAccountCommandHandler: DeleteAccountCommandHandler,
    private readonly getAccountQueryHandler: GetAccountQueryHandler,
  ) {}

  @UseGuards(AuthenticationRequired)
  @Mutation(() => DeleteMyAccountResponse)
  async deleteMyAccount(@Context() context: any): Promise<DeleteMyAccountResponse> {
    const accountId = this.getUserFromContext(context).accountId;
    const command = new DeleteAccountCommand(accountId);

    await this.deleteAccountCommandHandler.handle(command);

    return { success: true };
  }

  private getUserFromContext(context: any): UserInContext {
    return context.req.user;
  }
}
