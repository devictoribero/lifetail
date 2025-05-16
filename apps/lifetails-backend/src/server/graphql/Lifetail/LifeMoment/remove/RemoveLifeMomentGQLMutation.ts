import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RemoveLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoment/application/remove/RemoveLifeMomentCommandHandler';
import { RemoveLifeMomentCommand } from 'src/contexts/Lifetails/LifeMoment/application/remove/RemoveLifeMomentCommand';
import { RemoveLifeMomentInput } from './RemoveLifeMomentInput';
import { RemoveLifeMomentResponse } from './RemoveLifeMomentResponse';

@Resolver()
export class RemoveLifeMomentGQLMutation {
  constructor(private readonly commandHandler: RemoveLifeMomentCommandHandler) {}

  @Mutation(() => Boolean)
  async removeLifeMoment(
    @Args('input') input: RemoveLifeMomentInput,
  ): Promise<RemoveLifeMomentResponse> {
    const command = new RemoveLifeMomentCommand(input.id);
    await this.commandHandler.handle(command);

    return { id: input.id };
  }
}
