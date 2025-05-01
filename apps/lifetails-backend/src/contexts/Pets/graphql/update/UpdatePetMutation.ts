import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdatePetResponse } from './UpdatePetResponse';
import { UpdatePetInput } from './UpdatePetInput';
import { UpdatePetUseCase } from '../../application/update/UpdatePetUseCase';
import { UpdatePetCommand } from '../../application/update/UpdatePetCommand';

@Resolver()
export class UpdatePetMutation {
  constructor(private readonly useCase: UpdatePetUseCase) {}

  @Mutation(() => UpdatePetResponse)
  async updatePet(@Args('input') input: UpdatePetInput): Promise<UpdatePetResponse> {
    try {
      await this.useCase.execute(
        new UpdatePetCommand(
          input.id,
          input.name,
          input?.gender?.toString(),
          input.chipId,
          input.sterilized,
          input.birthdate,
        ),
      );

      return { id: input.id };
    } catch (error) {
      throw new Error(error.message ?? 'Error updating pet');
    }
  }
}
