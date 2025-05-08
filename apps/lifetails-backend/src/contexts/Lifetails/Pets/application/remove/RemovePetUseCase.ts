import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { RemovePetCommand } from './RemovePetCommand';

export class RemovePetUseCase {
  constructor(private readonly repository: PetRepository) {}

  async execute(command: RemovePetCommand): Promise<void> {
    await this.ensurePetExists(command.id);
    await this.repository.remove(command.id);
  }

  private async ensurePetExists(id: string): Promise<void> {
    const pet = await this.repository.find(id);
    if (!pet) {
      throw new PetNotFoundException(id);
    }
  }
}
