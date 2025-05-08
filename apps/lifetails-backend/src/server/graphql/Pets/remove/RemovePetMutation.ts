import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RemovePetUseCase } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetUseCase';
import { RemovePetCommand } from 'src/contexts/Lifetails/Pets/application/remove/RemovePetCommand';
import { RemovePetInput } from './RemovePetInput';

@Resolver()
export class RemovePetMutation {
  constructor(private readonly useCase: RemovePetUseCase) {}

  @Mutation(() => Boolean)
  async removePet(@Args('input') input: RemovePetInput): Promise<boolean> {
    try {
      await this.useCase.execute(new RemovePetCommand(input.id));
      return true;
    } catch (error) {
      throw new Error(error.message ?? 'Error removing pet');
    }
  }
}
