import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DeleteVeterinaryResponse } from './DeleteVeterinaryResponse';
import { DeleteVeterinaryInput } from './DeleteVeterinaryInput';
import { DeleteVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinaries/application/DeleteVeterinary/DeleteVeterinaryCommandHandler';
import { DeleteVeterinaryCommand } from 'src/contexts/PetManagement/Veterinaries/application/DeleteVeterinary/DeleteVeterinaryCommand';
import { VeterinaryNotFoundException } from 'src/contexts/PetManagement/Veterinaries/domain/exceptions/VeterinaryNotFoundException';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';

@Resolver()
@UseGuards(AuthenticationRequired)
export class DeleteVeterinaryGQLMutation {
  constructor(private readonly commandHandler: DeleteVeterinaryCommandHandler) {}

  @Mutation(() => DeleteVeterinaryResponse)
  async deleteVeterinary(
    @Args('input') input: DeleteVeterinaryInput,
  ): Promise<DeleteVeterinaryResponse> {
    try {
      const command = new DeleteVeterinaryCommand(input.id);
      await this.commandHandler.handle(command);

      return { id: input.id, success: true };
    } catch (error) {
      if (error instanceof VeterinaryNotFoundException) {
        throw new Error(`Veterinary not found: ${input.id}`);
      }
      throw error;
    }
  }
}
