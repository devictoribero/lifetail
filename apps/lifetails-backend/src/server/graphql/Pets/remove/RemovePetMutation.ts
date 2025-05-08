import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RemovePetCommandHandler } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetCommandHandler';
import { RemovePetCommand } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetCommand';
import { RemovePetInput } from './RemovePetInput';

@Resolver()
export class RemovePetMutation {
  constructor(private readonly commandHandler: RemovePetCommandHandler) {}

  @Mutation(() => Boolean)
  async removePet(@Args('input') input: RemovePetInput): Promise<boolean> {
    try {
      await this.commandHandler.execute(new RemovePetCommand(input.id));
      return true;
    } catch (error) {
      throw new Error(error.message ?? 'Error removing pet');
    }
  }
}
