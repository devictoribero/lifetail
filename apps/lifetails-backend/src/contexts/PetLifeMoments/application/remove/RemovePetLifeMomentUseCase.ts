import { PetLifeMomentNotFoundException } from '../../domain/exceptions/PetLifeMomentNotFoundException';
import { PetLifeMomentRepository } from '../../domain/repositories/PetLifeMomentRepository';
import { RemovePetLifeMomentCommand } from './RemovePetLifeMomentCommand';

export class RemovePetLifeMomentUseCase {
  constructor(private readonly repository: PetLifeMomentRepository) {}

  async execute(command: RemovePetLifeMomentCommand): Promise<void> {
    const petLifeMoment = await this.repository.find(command.id);
    if (!petLifeMoment) {
      throw new PetLifeMomentNotFoundException(command.id);
    }

    await this.repository.remove(command.id);
  }
}
