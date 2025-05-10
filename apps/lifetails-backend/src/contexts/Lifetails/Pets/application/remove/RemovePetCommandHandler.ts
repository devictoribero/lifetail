import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { RemovePetCommand } from './RemovePetCommand';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RemovePetCommandHandler {
  constructor(private readonly repository: PetRepository) {}

  async execute(command: RemovePetCommand): Promise<void> {
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
