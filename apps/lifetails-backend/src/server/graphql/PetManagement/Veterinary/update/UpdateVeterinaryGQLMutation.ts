import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UpdateVeterinaryResponse } from './UpdateVeterinaryResponse';
import { UpdateVeterinaryInput } from './UpdateVeterinaryInput';
import { UpdateVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinary/application/update/UpdateVeterinaryCommandHandler';
import { UpdateVeterinaryCommand } from 'src/contexts/PetManagement/Veterinary/application/update/UpdateVeterinaryCommand';
import { VeterinaryNotFoundException } from 'src/contexts/PetManagement/Veterinary/domain/exceptions/VeterinaryNotFoundException';
import { VeterinaryNameTooShortException } from 'src/contexts/PetManagement/Veterinary/domain/exceptions/VeterinaryNameTooShortException';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';

@Resolver()
@UseGuards(AuthenticationRequired)
export class UpdateVeterinaryGQLMutation {
  constructor(private readonly commandHandler: UpdateVeterinaryCommandHandler) {}

  @Mutation(() => UpdateVeterinaryResponse)
  async updateVeterinary(
    @Args('input') input: UpdateVeterinaryInput,
  ): Promise<UpdateVeterinaryResponse> {
    const command = new UpdateVeterinaryCommand(
      input.id,
      input.name,
      input.address,
      input.email,
      input.primaryPhone,
      input.emergencyPhone,
      input.notes,
    );
    await this.commandHandler.handle(command);

    return { id: input.id };
  }
}
