import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { RemovePetCommand } from './RemovePetCommand';

export class RemovePetCommandHandler {
  constructor(private readonly repository: PetRepository) {}

  async execute(command: RemovePetCommand): Promise<void> {
    await this.ensurePetExists(command.id);
    await this.repository.remove(new UUID(command.id));
  }

  private async ensurePetExists(id: string): Promise<void> {
    const petId = new UUID(id);
    const pet = await this.repository.find(petId);
    if (!pet) {
      throw new PetNotFoundException(id);
    }
  }
}
