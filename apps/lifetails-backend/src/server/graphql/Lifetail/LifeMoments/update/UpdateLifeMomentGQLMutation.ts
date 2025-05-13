import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateLifeMomentResponse } from './UpdateLifeMomentResponse';
import { UpdateLifeMomentInput } from './UpdateLifeMomentInput';
import { UpdateLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/update/UpdateLifeMomentCommandHandler';
import { UpdateLifeMomentCommand } from 'src/contexts/Lifetails/LifeMoments/application/update/UpdateLifeMomentCommand';

@Resolver()
export class UpdateLifeMomentGQLMutation {
  constructor(private readonly commandHandler: UpdateLifeMomentCommandHandler) {}

  @Mutation(() => UpdateLifeMomentResponse)
  async updateLifeMoment(
    @Args('input') input: UpdateLifeMomentInput,
  ): Promise<UpdateLifeMomentResponse> {
    try {
      const command = new UpdateLifeMomentCommand(input.id, input.description, input.occurredOn);
      await this.commandHandler.execute(command);

      return { id: input.id };
    } catch (error) {
      throw new Error(error.message ?? 'Error updating life moment');
    }
  }
}
