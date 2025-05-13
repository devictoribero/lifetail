import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdatePetResponse } from './UpdatePetResponse';
import { UpdatePetInput } from './UpdatePetInput';
import { UpdatePetCommandHandler } from 'src/contexts/PetManagement/Pets/application/update/UpdatePetCommandHandler';
import { UpdatePetCommand } from 'src/contexts/PetManagement/Pets/application/update/UpdatePetCommand';

@Resolver()
export class UpdatePetGQLMutation {
  constructor(private readonly commandHandler: UpdatePetCommandHandler) {}

  @Mutation(() => UpdatePetResponse)
  async updatePet(@Args('input') input: UpdatePetInput): Promise<UpdatePetResponse> {
    try {
      const command = new UpdatePetCommand(
        input.id,
        input.name,
        input?.gender?.toString(),
        input.chipId,
        input.sterilized,
        input.anniversaryDate,
      );
      await this.commandHandler.execute(command);

      return { id: input.id };
    } catch (error) {
      throw new Error(error.message ?? 'Error updating pet');
    }
  }
}
