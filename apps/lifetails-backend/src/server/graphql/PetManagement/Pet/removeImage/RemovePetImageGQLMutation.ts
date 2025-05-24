import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';
import { RemovePetImageCommandHandler } from 'src/contexts/PetManagement/Pet/application/remove-image/RemovePetImageCommandHandler';
import { RemovePetImageCommand } from 'src/contexts/PetManagement/Pet/application/remove-image/RemovePetImageCommand';
import { RemovePetImageInput } from './RemovePetImageInput';
import { RemovePetImageResponse } from './RemovePetImageResponse';

@Resolver()
@UseGuards(AuthenticationRequired)
export class RemovePetImageGQLMutation {
  constructor(private readonly commandHandler: RemovePetImageCommandHandler) {}

  @Mutation(() => RemovePetImageResponse)
  async removePetImage(@Args('input') input: RemovePetImageInput): Promise<RemovePetImageResponse> {
    const command = new RemovePetImageCommand(input.petId);

    await this.commandHandler.handle(command);

    return { id: input.petId };
  }
}
