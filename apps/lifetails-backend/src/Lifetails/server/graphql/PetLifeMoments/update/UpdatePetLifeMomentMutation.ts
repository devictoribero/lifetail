import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdatePetLifeMomentResponse } from './UpdatePetLifeMomentResponse';
import { UpdatePetLifeMomentInput } from './UpdatePetLifeMomentInput';
import { UpdatePetLifeMomentUseCase } from 'src/Lifetails/contexts/PetLifeMoments/application/update/UpdatePetLifeMomentUseCase';
import { UpdatePetLifeMomentCommand } from 'src/Lifetails/contexts/PetLifeMoments/application/update/UpdatePetLifeMomentCommand';

@Resolver()
export class UpdatePetLifeMomentMutation {
  constructor(private readonly useCase: UpdatePetLifeMomentUseCase) {}

  @Mutation(() => UpdatePetLifeMomentResponse)
  async updatePetLifeMoment(
    @Args('input') input: UpdatePetLifeMomentInput,
  ): Promise<UpdatePetLifeMomentResponse> {
    try {
      await this.useCase.execute(
        new UpdatePetLifeMomentCommand(input.id, input.description, input.occurredOn, input.petId),
      );

      return { id: input.id };
    } catch (error) {
      throw new Error(error.message ?? 'Error updating pet life moment');
    }
  }
}
