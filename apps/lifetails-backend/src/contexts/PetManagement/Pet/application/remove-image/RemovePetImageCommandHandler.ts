import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { PetRepository, PET_REPOSITORY } from '../../domain/repositories/PetRepository';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { RemovePetImageCommand } from './RemovePetImageCommand';
import { Pet } from '../../domain/entities/Pet';

@Injectable()
export class RemovePetImageCommandHandler implements CommandHandler<RemovePetImageCommand> {
  constructor(
    @Inject(PET_REPOSITORY)
    private readonly repository: PetRepository,
  ) {}

  async handle(command: RemovePetImageCommand): Promise<void> {
    const petId = new UUID(command.petId);
    const pet = await this.getPet(petId);

    pet.removeImage();

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
