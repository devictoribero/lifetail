import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterPetLifeMomentResponse } from '../types/RegisterPetLifeMomentResponse';
import { RegisterPetLifeMomentInput } from '../types/RegisterPetLifeMomentInput';
import { AddPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/add-pet-life-moment/AddPetLifeMomentUseCase';
import { AddPetLifeMomentCommand } from 'src/contexts/PetLifeMoments/application/add-pet-life-moment/AddPetLifeMomentCommand';
import { randomUUID } from 'crypto';

@Resolver()
export class RegisterPetLifeMomentMutation {
  constructor(private readonly addPetLifeMomentUseCase: AddPetLifeMomentUseCase) {}

  @Mutation(() => RegisterPetLifeMomentResponse)
  async registerPetLifeMoment(
    @Args('input') input: RegisterPetLifeMomentInput,
  ): Promise<RegisterPetLifeMomentResponse> {
    try {
      const id = randomUUID();

      await this.addPetLifeMomentUseCase.execute(
        new AddPetLifeMomentCommand(
          id,
          input.eventType,
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
