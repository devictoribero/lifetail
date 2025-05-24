import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { ImageValueObject } from 'src/contexts/Shared/domain/ImageValueObject/ImageValueObject';
import { PetRepository, PET_REPOSITORY } from '../../domain/repositories/PetRepository';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { ChangePetImageCommand } from './ChangePetImageCommand';
import { Pet } from '../../domain/entities/Pet';

@Injectable()
export class ChangePetImageCommandHandler implements CommandHandler<ChangePetImageCommand> {
  constructor(
    @Inject(PET_REPOSITORY)
    private readonly repository: PetRepository,
  ) {}

  async handle(command: ChangePetImageCommand): Promise<void> {
    const petId = new UUID(command.petId);
    const pet = await this.getPet(petId);

    const image = new ImageValueObject(command.imageKey, command.imageUploadedAt);
    pet.changeImageTo(image);

    await this.repository.save(pet);
  }

  private async getPet(petId: UUID): Promise<Pet> {
    const pet = await this.repository.find(petId);

    if (!pet) {
      throw new PetNotFoundException();
    }

    return pet;
  }
}
