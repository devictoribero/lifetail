import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterPetLifeMomentResponse } from '../types/RegisterPetLifeMomentResponse';
import { RegisterPetLifeMomentInput } from '../types/RegisterPetLifeMomentInput';
import { RegisterPetLifeMomentUseCase } from 'src/contexts/PetLifeMoments/application/register-pet-life-moment/RegisterPetLifeMomentUseCase';
import { RegisterPetLifeMomentCommand } from 'src/contexts/PetLifeMoments/application/register-pet-life-moment/RegisterPetLifeMomentCommand';
import { randomUUID } from 'crypto';

@Resolver()
export class RegisterPetLifeMomentMutation {
  constructor(private readonly registerPetLifeMomentUseCase: RegisterPetLifeMomentUseCase) {}

  @Mutation(() => RegisterPetLifeMomentResponse)
  async registerPetLifeMoment(
    @Args('input') input: RegisterPetLifeMomentInput,
  ): Promise<RegisterPetLifeMomentResponse> {
    try {
      const id = randomUUID();

      await this.registerPetLifeMomentUseCase.execute(
        new RegisterPetLifeMomentCommand(
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
