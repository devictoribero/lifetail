import { PetLifeMomentNotFoundException } from '../../domain/exceptions/PetLifeMomentNotFoundException';
import { PetLifeMomentRepository } from '../../domain/repositories/PetLifeMomentRepository';
import { RemovePetLifeMomentCommand } from './RemovePetLifeMomentCommand';

export class RemovePetLifeMomentUseCase {
  constructor(private readonly repository: PetLifeMomentRepository) {}

  async execute(command: RemovePetLifeMomentCommand): Promise<void> {
    await this.ensurePetLifeMomentExists(command.id);
    await this.repository.remove(command.id);
  }

  private async ensurePetLifeMomentExists(id: string): Promise<void> {
    const petLifeMoment = await this.repository.find(id);
    if (!petLifeMoment) {
      throw new PetLifeMomentNotFoundException(id);
    }
  }
}
