import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ChangeUserPreferredLanguageCommandHandler } from 'src/contexts/Identity/User/application/change-preferred-language/ChangeUserPreferredLanguageCommandHandler';
import { UseGuards } from '@nestjs/common';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';
import { ChangeUserPreferredLanguageResponse } from './ChangeUserPreferredLanguageResponse';
import { ChangeUserPreferredLanguageInput } from './ChangeUserPreferredLanguageInput';
import { ChangeUserPreferredLanguageCommand } from 'src/contexts/Identity/User/application/change-preferred-language/ChangeUserPreferredLanguageCommand';

@Resolver()
@UseGuards(AuthenticationRequired)
export class ChangeUserPreferredLanguageGQLMutation {
  constructor(
    private readonly changeUserPreferredLanguageCommandHandler: ChangeUserPreferredLanguageCommandHandler,
  ) {}

  @Mutation(() => ChangeUserPreferredLanguageResponse)
  async changeUserPreferredLanguage(
    @Args('input') input: ChangeUserPreferredLanguageInput,
    @Context() context: any,
  ): Promise<ChangeUserPreferredLanguageResponse> {
    const userId = context.req.user.id;

    const command = new ChangeUserPreferredLanguageCommand(userId, input.languageCode);
    await this.changeUserPreferredLanguageCommandHandler.handle(command);

    return { success: true };
  }
}
