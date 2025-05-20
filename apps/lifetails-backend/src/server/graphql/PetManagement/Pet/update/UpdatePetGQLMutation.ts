import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdatePetResponse } from './UpdatePetResponse';
import { UpdatePetInput } from './UpdatePetInput';
import { UpdatePetCommandHandler } from 'src/contexts/PetManagement/Pet/application/update/UpdatePetCommandHandler';
import { UpdatePetCommand } from 'src/contexts/PetManagement/Pet/application/update/UpdatePetCommand';

@Resolver()
export class UpdatePetGQLMutation {
  constructor(private readonly commandHandler: UpdatePetCommandHandler) {}

  @Mutation(() => UpdatePetResponse)
  async updatePet(@Args('input') input: UpdatePetInput): Promise<UpdatePetResponse> {
    const command = new UpdatePetCommand(
      input.id,
      input.name,
      input?.gender?.toString(),
      input.sterilized,
      input.anniversaryDate,
      input.arrivalDate,
      input.microchipNumber,
      input.color,
    );
    await this.commandHandler.handle(command);

    return { id: input.id };
  }
}
