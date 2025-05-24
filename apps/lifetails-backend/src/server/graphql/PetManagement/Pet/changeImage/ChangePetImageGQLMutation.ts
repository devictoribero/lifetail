import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';
import { ChangePetImageCommandHandler } from 'src/contexts/PetManagement/Pet/application/change-image/ChangePetImageCommandHandler';
import { ChangePetImageCommand } from 'src/contexts/PetManagement/Pet/application/change-image/ChangePetImageCommand';
import { ChangePetImageInput } from './ChangePetImageInput';
import { ChangePetImageResponse } from './ChangePetImageResponse';

@Resolver()
@UseGuards(AuthenticationRequired)
export class ChangePetImageGQLMutation {
  constructor(private readonly commandHandler: ChangePetImageCommandHandler) {}

  @Mutation(() => ChangePetImageResponse)
  async changePetImage(@Args('input') input: ChangePetImageInput): Promise<ChangePetImageResponse> {
    const command = new ChangePetImageCommand(input.petId, input.image.key, input.image.uploadedAt);

    await this.commandHandler.handle(command);

    return { id: input.petId };
  }
}
