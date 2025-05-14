import { UUID } from 'src/contexts/Shared/domain/UUID';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { RemovePetCommand } from './RemovePetCommand';
import { Inject, Injectable } from '@nestjs/common';
import { PET_REPOSITORY } from '../../domain/repositories/PetRepository';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';

@Injectable()
export class RemovePetCommandHandler implements CommandHandler<RemovePetCommand> {
  constructor(
    @Inject(PET_REPOSITORY)
    private readonly repository: PetRepository,
  ) {}

  async handle(command: RemovePetCommand): Promise<void> {
    const petId = new UUID(command.id);
    await this.ensurePetExists(petId);
    await this.repository.remove(petId);
  }

  private async ensurePetExists(id: UUID): Promise<void> {
    const pet = await this.repository.find(id);
    if (!pet) {
      throw new PetNotFoundException(id.toString());
    }
  }
}
