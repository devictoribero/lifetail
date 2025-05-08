import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RemovePetLifeMomentUseCase } from 'src/contexts/Lifetails/PetLifeMoments/application/remove/RemovePetLifeMomentUseCase';
import { RemovePetLifeMomentCommand } from 'src/contexts/Lifetails/PetLifeMoments/application/remove/RemovePetLifeMomentCommand';
import { RemovePetLifeMomentInput } from './RemovePetLifeMomentInput';

@Resolver()
export class RemovePetLifeMomentMutation {
  constructor(private readonly useCase: RemovePetLifeMomentUseCase) {}

  @Mutation(() => Boolean)
  async removePetLifeMoment(@Args('input') input: RemovePetLifeMomentInput): Promise<void> {
    try {
      await this.useCase.execute(new RemovePetLifeMomentCommand(input.id));
    } catch (error) {
      throw new Error(error.message ?? 'Error removing pet life moment');
    }
  }
}
