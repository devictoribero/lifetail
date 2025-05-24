import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AddVeterinaryResponse } from './AddVeterinaryResponse';
import { AddVeterinaryInput } from './AddVeterinaryInput';
import { AddVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinary/application/add/AddVeterinaryCommandHandler';
import { AddVeterinaryCommand } from 'src/contexts/PetManagement/Veterinary/application/add/AddVeterinaryCommand';
import { VeterinaryNameTooShortException } from 'src/contexts/PetManagement/Veterinary/domain/exceptions/VeterinaryNameTooShortException';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';

@Resolver()
@UseGuards(AuthenticationRequired)
export class AddVeterinaryGQLMutation {
  constructor(private readonly commandHandler: AddVeterinaryCommandHandler) {}

  @Mutation(() => AddVeterinaryResponse)
  async addVeterinary(@Args('input') input: AddVeterinaryInput): Promise<AddVeterinaryResponse> {
    const command = new AddVeterinaryCommand(input.id, input.name);
    await this.commandHandler.handle(command);

    return { id: input.id };
  }
}
