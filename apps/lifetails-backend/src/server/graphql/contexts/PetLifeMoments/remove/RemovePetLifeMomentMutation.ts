import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RemovePetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/remove/RemovePetLifeMomentUseCase';
import { RemovePetLifeMomentCommand } from 'src/contexts/PetLifeMoments/application/remove/RemovePetLifeMomentCommand';
import { RemovePetLifeMomentInput } from './RemovePetLifeMomentInput';

@Resolver()
export class RemovePetLifeMomentMutation {
  constructor(private readonly removePetLifeMomentUseCase: RemovePetLifeMomentUseCase) {}

  @Mutation(() => Boolean)
  async removePetLifeMoment(@Args('input') input: RemovePetLifeMomentInput): Promise<void> {
    try {
      await this.removePetLifeMomentUseCase.execute(new RemovePetLifeMomentCommand(input.id));
    } catch (error) {
      throw new Error(error.message ?? 'Error removing pet life moment');
    }
  }
}
