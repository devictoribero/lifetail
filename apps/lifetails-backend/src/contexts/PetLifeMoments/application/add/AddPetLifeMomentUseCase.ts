import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentInMemoryRepository } from '../../infrastructure/PetLifeMomentInMemoryRepository';
import { AddPetLifeMomentCommand } from './AddPetLifeMomentCommand';

export class AddPetLifeMomentUseCase {
  constructor(private readonly petLifeMomentRepository: PetLifeMomentInMemoryRepository) {}

  async execute(command: AddPetLifeMomentCommand): Promise<void> {
    const petLifeMoment = PetLifeMoment.create(
      command.id,
      command.type,
      command.petId,
      command.createdBy,
      command.occurredOn,
      command.description,
    );

    await this.petLifeMomentRepository.save(petLifeMoment);
  }
}
