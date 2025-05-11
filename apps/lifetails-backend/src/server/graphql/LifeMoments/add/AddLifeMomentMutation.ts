import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AddLifeMomentResponse } from './AddLifeMomentResponse';
import { AddLifeMomentInput } from './AddLifeMomentInput';
import { AddLifeMomentCommandHandler } from 'src/contexts/Lifetails/LifeMoments/application/add/AddLifeMomentCommandHandler';
import { AddLifeMomentCommand } from 'src/contexts/Lifetails/LifeMoments/application/add/AddLifeMomentCommand';
import { AuthenticationRequired } from 'src/contexts/Lifetails/Authentication/infrastructure/guards/AuthenticationRequired';

@Resolver()
@UseGuards(AuthenticationRequired)
export class AddLifeMomentMutation {
  constructor(private readonly commandHandler: AddLifeMomentCommandHandler) {}

  @Mutation(() => AddLifeMomentResponse)
  async addLifeMoment(@Args('input') input: AddLifeMomentInput): Promise<AddLifeMomentResponse> {
    try {
      const command = new AddLifeMomentCommand(
        input.id,
        input.type,
        input.petId,
        input.createdBy,
        input.occurredOn,
        input.description,
      );
      await this.commandHandler.execute(command);

      return { id: input.id };
    } catch (error) {
      throw new Error(error.message ?? 'Error adding life moment');
    }
  }
}
