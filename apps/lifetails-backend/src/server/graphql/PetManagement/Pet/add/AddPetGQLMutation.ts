import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AddPetResponse } from './AddPetResponse';
import { AddPetInput } from './AddPetInput';
import { AddPetCommandHandler } from 'src/contexts/PetManagement/Pet/application/add/AddPetCommandHandler';
import { AddPetCommand } from 'src/contexts/PetManagement/Pet/application/add/AddPetCommand';
import { MaxNumberOfPetsReachedException } from 'src/contexts/PetManagement/Pet/domain/exceptions/MaxNumberOfPetsReachedException';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';

@Resolver()
@UseGuards(AuthenticationRequired)
export class AddPetGQLMutation {
  constructor(private readonly commandHandler: AddPetCommandHandler) {}

  @Mutation(() => AddPetResponse)
  async addPet(
    @Args('input') input: AddPetInput,
    @Context() context: any,
  ): Promise<AddPetResponse> {
    const userId = context.req.user.id;

    const command = new AddPetCommand(
      input.id,
      input.species.toString(),
      input.name,
      input.gender.toString(),
      input.sterilized,
      input.anniversaryDate,
      userId,
      input.color,
    );
    await this.commandHandler.handle(command);

    return { id: input.id };
  }
}
