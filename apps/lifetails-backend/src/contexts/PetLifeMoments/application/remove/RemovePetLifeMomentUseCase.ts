import { PetLifeMomentRepository } from '../../domain/repositories/PetLifeMomentRepository';
import { RemovePetLifeMomentCommand } from './RemovePetLifeMomentCommand';

export class RemovePetLifeMomentUseCase {
  constructor(private readonly repository: PetLifeMomentRepository) {}

  async execute(command: RemovePetLifeMomentCommand): Promise<void> {
    await this.repository.remove(command.id);
  }
}