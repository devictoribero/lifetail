import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AddVeterinaryResponse } from './AddVeterinaryResponse';
import { AddVeterinaryInput } from './AddVeterinaryInput';
import { AddVeterinaryCommandHandler } from 'src/contexts/PetManagement/Veterinaries/application/AddVeterinary/AddVeterinaryCommandHandler';
import { AddVeterinaryCommand } from 'src/contexts/PetManagement/Veterinaries/application/AddVeterinary/AddVeterinaryCommand';
import { VeterinaryNameTooShortException } from 'src/contexts/PetManagement/Veterinaries/domain/exceptions/VeterinaryNameTooShortException';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';

@Resolver()
@UseGuards(AuthenticationRequired)
export class AddVeterinaryGQLMutation {
  constructor(private readonly commandHandler: AddVeterinaryCommandHandler) {}

  @Mutation(() => AddVeterinaryResponse)
  async addVeterinary(
    @Args('input') input: AddVeterinaryInput,
    @Context() context: any,
  ): Promise<AddVeterinaryResponse> {
    try {
      const command = new AddVeterinaryCommand(input.id, input.name);
      await this.commandHandler.handle(command);

      return { id: input.id };
    } catch (error) {
      if (error instanceof VeterinaryNameTooShortException) {
        throw new Error('Veterinary name must have at least 3 characters');
      }
      throw error;
    }
  }
}
