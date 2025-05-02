import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddPetResponse } from './AddPetResponse';
import { AddPetInput } from './AddPetInput';
import { AddPetUseCase } from '../../application/add/AddPetUseCase';
import { AddPetCommand } from '../../application/add/AddPetCommand';

@Resolver()
export class AddPetMutation {
  constructor(private readonly useCase: AddPetUseCase) {}

  @Mutation(() => AddPetResponse)
  async addPet(@Args('input') input: AddPetInput): Promise<AddPetResponse> {
    try {
      await this.useCase.execute(
        new AddPetCommand(
          input.id,
          input.name,
          input.gender.toString(),
          input.chipId,
          input.sterilized,
          input.birthDate,
        ),
      );

      return { id: input.id };
    } catch (error) {
      throw new Error(error.message ?? 'Error adding pet');
    }
  }
}
