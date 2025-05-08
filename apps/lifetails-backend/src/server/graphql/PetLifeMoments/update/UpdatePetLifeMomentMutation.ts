import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdatePetLifeMomentResponse } from './UpdatePetLifeMomentResponse';
import { UpdatePetLifeMomentInput } from './UpdatePetLifeMomentInput';
import { UpdatePetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/update/UpdatePetLifeMomentCommandHandler';
import { UpdatePetLifeMomentCommand } from 'src/contexts/Lifetails/PetLifeMoments/application/update/UpdatePetLifeMomentCommand';

@Resolver()
export class UpdatePetLifeMomentMutation {
  constructor(private readonly commandHandler: UpdatePetLifeMomentCommandHandler) {}

  @Mutation(() => UpdatePetLifeMomentResponse)
  async updatePetLifeMoment(
    @Args('input') input: UpdatePetLifeMomentInput,
  ): Promise<UpdatePetLifeMomentResponse> {
    try {
      await this.commandHandler.execute(
        new UpdatePetLifeMomentCommand(input.id, input.description, input.occurredOn, input.petId),
      );

      return { id: input.id };
    } catch (error) {
      throw new Error(error.message ?? 'Error updating pet life moment');
    }
  }
}
