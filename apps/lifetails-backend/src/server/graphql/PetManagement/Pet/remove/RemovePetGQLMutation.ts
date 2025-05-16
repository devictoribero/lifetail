import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RemovePetCommandHandler } from 'src/contexts/PetManagement/Pet/application/remove/RemovePetCommandHandler';
import { RemovePetCommand } from 'src/contexts/PetManagement/Pet/application/remove/RemovePetCommand';
import { RemovePetInput } from './RemovePetInput';
import { RemovePetResponse } from './RemovePetResponse';

@Resolver()
export class RemovePetGQLMutation {
  constructor(private readonly commandHandler: RemovePetCommandHandler) {}

  @Mutation(() => RemovePetResponse)
  async removePet(@Args('input') input: RemovePetInput): Promise<RemovePetResponse> {
    try {
      const command = new RemovePetCommand(input.id);
      await this.commandHandler.handle(command);

      return { id: input.id };
    } catch (error) {
      throw new Error(error.message ?? 'Error removing pet');
    }
  }
}
