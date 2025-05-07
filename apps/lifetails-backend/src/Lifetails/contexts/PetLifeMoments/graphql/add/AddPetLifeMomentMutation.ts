import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddPetLifeMomentResponse } from './AddPetLifeMomentResponse';
import { AddPetLifeMomentInput } from './AddPetLifeMomentInput';
import { AddPetLifeMomentUseCase } from 'src/Lifetails/contexts/PetLifeMoments/application/add/AddPetLifeMomentUseCase';
import { AddPetLifeMomentCommand } from 'src/Lifetails/contexts/PetLifeMoments/application/add/AddPetLifeMomentCommand';

@Resolver()
export class AddPetLifeMomentMutation {
  constructor(private readonly useCase: AddPetLifeMomentUseCase) {}

  @Mutation(() => AddPetLifeMomentResponse)
  async addPetLifeMoment(
    @Args('input') input: AddPetLifeMomentInput,
  ): Promise<AddPetLifeMomentResponse> {
    try {
      await this.useCase.execute(
        new AddPetLifeMomentCommand(
          input.id,
          input.type,
          input.petId,
          input.createdBy,
          input.occurredOn,
          input.description,
        ),
      );

      return { id: input.id };
    } catch (error) {
      throw new Error(error.message ?? 'Error adding pet life moment');
    }
  }
}
