import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddPetLifeMomentResponse } from './AddPetLifeMomentResponse';
import { AddPetLifeMomentInput } from './AddPetLifeMomentInput';
import { AddPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/add/AddPetLifeMomentUseCase';
import { AddPetLifeMomentCommand } from 'src/contexts/PetLifeMoments/application/add/AddPetLifeMomentCommand';

@Resolver()
export class AddPetLifeMomentMutation {
  constructor(private readonly addPetLifeMomentUseCase: AddPetLifeMomentUseCase) {}

  @Mutation(() => AddPetLifeMomentResponse)
  async addPetLifeMoment(
    @Args('input') input: AddPetLifeMomentInput,
  ): Promise<AddPetLifeMomentResponse> {
    try {
      await this.addPetLifeMomentUseCase.execute(
        new AddPetLifeMomentCommand(
          input.id,
          input.type,
          input.petId,
          input.createdBy,
          input.occurredOn,
          input.description,
        ),
      );

      return {
        id: input.id,
        success: true,
      };
    } catch (error) {
      return {
        id: '',
        success: false,
        errorMessage: error.message,
      };
    }
  }
}
