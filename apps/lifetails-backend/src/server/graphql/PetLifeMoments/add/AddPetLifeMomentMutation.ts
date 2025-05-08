import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddPetLifeMomentResponse } from './AddPetLifeMomentResponse';
import { AddPetLifeMomentInput } from './AddPetLifeMomentInput';
import { AddPetLifeMomentCommandHandler } from 'src/contexts/Lifetails/PetLifeMoments/application/add/AddPetLifeMomentCommandHandler';
import { AddPetLifeMomentCommand } from 'src/contexts/Lifetails/PetLifeMoments/application/add/AddPetLifeMomentCommand';

@Resolver()
export class AddPetLifeMomentMutation {
  constructor(private readonly commandHandler: AddPetLifeMomentCommandHandler) {}

  @Mutation(() => AddPetLifeMomentResponse)
  async addPetLifeMoment(
    @Args('input') input: AddPetLifeMomentInput,
  ): Promise<AddPetLifeMomentResponse> {
    try {
      const command = new AddPetLifeMomentCommand(
        input.id,
        input.type,
        input.petId,
        input.createdBy,
        input.occurredOn,
        input.description,
      );
      await this.commandHandler.execute(command);

      return { id: input.id };
    } catch (error) {
      throw new Error(error.message ?? 'Error adding pet life moment');
    }
  }
}
