import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AddPetResponse } from './AddPetResponse';
import { AddPetInput } from './AddPetInput';
import { AddPetCommandHandler } from 'src/contexts/PetManagement/Pets/application/add/AddPetCommandHandler';
import { AddPetCommand } from 'src/contexts/PetManagement/Pets/application/add/AddPetCommand';
import { MaxNumberOfPetsReachedException } from 'src/contexts/PetManagement/Pets/domain/exceptions/MaxNumberOfPetsReachedException';
import { AuthenticationRequired } from 'src/contexts/Identity/Authentication/infrastructure/guards/AuthenticationRequired';

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

    try {
      // We could validate that the userId in the request matches the authenticated user
      // For now, we'll just pass along the userId from the input

      const command = new AddPetCommand(
        input.id,
        input.species.toString(),
        input.name,
        input.gender.toString(),
        input.sterilized,
        input.anniversaryDate,
        userId,
      );
      await this.commandHandler.execute(command);

      return { id: input.id };
    } catch (error) {
      if (error instanceof MaxNumberOfPetsReachedException) {
        throw new Error('Maximum number of pets reached for this user');
      }
      throw error;
    }
  }
}
