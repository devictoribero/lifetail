import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AddPetLifeMomentResponse } from './AddPetLifeMomentResponse';
import { AddPetLifeMomentInput } from './AddPetLifeMomentInput';
import { AddPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/add/AddPetLifeMomentUseCase';
import { AddPetLifeMomentCommand } from 'src/contexts/PetLifeMoments/application/add/AddPetLifeMomentCommand';
import { randomUUID } from 'crypto';

@Resolver()
export class AddPetLifeMomentMutation {
  constructor(private readonly addPetLifeMomentUseCase: AddPetLifeMomentUseCase) {}

  @Mutation(() => AddPetLifeMomentResponse)
  async addPetLifeMoment(
    @Args('input') input: AddPetLifeMomentInput,
  ): Promise<AddPetLifeMomentResponse> {
    try {
      const id = randomUUID();

      await this.addPetLifeMomentUseCase.execute(
        new AddPetLifeMomentCommand(
          id,
          input.type,
          input.petId,
          input.createdBy,
          input.occurredOn,
          input.description,
        ),
      );

      return {
        id,
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
