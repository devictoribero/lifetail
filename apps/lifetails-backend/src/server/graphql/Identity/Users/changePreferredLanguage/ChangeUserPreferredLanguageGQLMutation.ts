import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ChangeUserPreferredLanguageCommandHandler } from 'src/contexts/Lifetails/Users/application/changePreferredLanguage/ChangeUserPreferredLanguageCommandHandler';
import { ChangeUserPreferredLanguageCommand } from 'src/contexts/Lifetails/Users/application/changePreferredLanguage/ChangeUserPreferredLanguageCommand';
import { UserNotFoundException } from 'src/contexts/Lifetails/Users/domain/exceptions/UserNotFoundException';
import { InvalidLanguageException } from 'src/contexts/Lifetails/Shared/domain/exceptions/InvalidLanguageException';
import { UseGuards } from '@nestjs/common';
import { AuthenticationRequired } from 'src/contexts/Lifetails/Authentication/infrastructure/guards/AuthenticationRequired';
import { ChangeUserPreferredLanguageResponse } from './ChangeUserPreferredLanguageResponse';
import { ChangeUserPreferredLanguageInput } from './ChangeUserPreferredLanguageInput';

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
    try {
      const userId = context.req.user.id;

      const command = new ChangeUserPreferredLanguageCommand(userId, input.languageCode);
      await this.changeUserPreferredLanguageCommandHandler.handle(command);

      return { success: true };
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new Error(`User not found: ${error.message}`);
      }

      if (error instanceof InvalidLanguageException) {
        throw new Error(`Invalid language: ${error.message}`);
      }

      throw new Error(error.message ?? 'Error changing user preferred language');
    }
  }
}
