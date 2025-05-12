import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RemoveLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/remove/RemoveLifeMomentCommandHandler';
import { RemoveLifeMomentCommand } from 'src/contexts/Lifetails/LifeMoments/application/remove/RemoveLifeMomentCommand';
import { RemoveLifeMomentInput } from './RemoveLifeMomentInput';
import { RemoveLifeMomentResponse } from './RemoveLifeMomentResponse';

@Resolver()
export class RemoveLifeMomentGQLMutation {
  constructor(private readonly commandHandler: RemoveLifeMomentCommandHandler) {}

  @Mutation(() => Boolean)
  async removeLifeMoment(
    @Args('input') input: RemoveLifeMomentInput,
  ): Promise<RemoveLifeMomentResponse> {
    try {
      const command = new RemoveLifeMomentCommand(input.id);
      await this.commandHandler.execute(command);

      return { id: input.id };
    } catch (error) {
      throw new Error(error.message ?? 'Error removing life moment');
    }
  }
}
