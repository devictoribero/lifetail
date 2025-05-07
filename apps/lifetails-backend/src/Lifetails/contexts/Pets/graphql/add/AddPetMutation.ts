import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddPetResponse } from './AddPetResponse';
import { AddPetInput } from './AddPetInput';
import { AddPetUseCase } from '../../application/add/AddPetUseCase';
import { AddPetCommand } from '../../application/add/AddPetCommand';
import { MaxNumberOfPetsReachedException } from '../../domain/exceptions/MaxNumberOfPetsReachedException';

@Resolver()
export class AddPetMutation {
  constructor(private readonly useCase: AddPetUseCase) {}

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
      await this.useCase.execute(command);

      return { id: input.id };
    } catch (error) {
      if (error instanceof MaxNumberOfPetsReachedException) {
        throw new Error('Max number of pets reached');
      }
      throw new Error(error.message ?? 'Error adding pet');
    }
  }
}
