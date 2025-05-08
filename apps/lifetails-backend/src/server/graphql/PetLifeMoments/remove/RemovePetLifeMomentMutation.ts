import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RemovePetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/remove/RemovePetLifeMomentCommandHandler';
import { RemovePetLifeMomentCommand } from 'src/contexts/Lifetails/PetLifeMoments/application/remove/RemovePetLifeMomentCommand';
import { RemovePetLifeMomentInput } from './RemovePetLifeMomentInput';

@Resolver()
export class RemovePetLifeMomentMutation {
  constructor(private readonly commandHandler: RemovePetLifeMomentCommandHandler) {}

  @Mutation(() => Boolean)
  async removePetLifeMoment(@Args('input') input: RemovePetLifeMomentInput): Promise<void> {
    try {
      await this.commandHandler.execute(new RemovePetLifeMomentCommand(input.id));
    } catch (error) {
      throw new Error(error.message ?? 'Error removing pet life moment');
    }
  }
}
