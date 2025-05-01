import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { RemovePetCommand } from './RemovePetCommand';

export class RemovePetUseCase {
  constructor(private readonly repository: PetRepository) {}

  async execute(command: RemovePetCommand): Promise<void> {
    const pet = await this.repository.find(command.id);
    if (!pet) {
      throw new PetNotFoundException(command.id);
    }

    await this.repository.remove(command.id);
  }
}
