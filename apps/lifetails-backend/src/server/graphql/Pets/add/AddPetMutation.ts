import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AddPetResponse } from './AddPetResponse';
import { AddPetInput } from './AddPetInput';
import { AddPetCommandHandler } from 'src/contexts/Lifetails/Pets/application/add/AddPetCommandHandler';
import { AddPetCommand } from 'src/contexts/Lifetails/Pets/application/add/AddPetCommand';
import { MaxNumberOfPetsReachedException } from 'src/contexts/Lifetails/Pets/domain/exceptions/MaxNumberOfPetsReachedException';

@Resolver()
export class AddPetMutation {
  constructor(private readonly commandHandler: AddPetCommandHandler) {}

  @Mutation(() => AddPetResponse)
  async addPet(@Args('input') input: AddPetInput): Promise<AddPetResponse> {
    try {
      const command = new AddPetCommand(
        input.id,
        input.species.toString(),
        input.name,
        input.gender.toString(),
        input.chipId,
        input.sterilized,
        input.anniversaryDate,
        input.userId,
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
