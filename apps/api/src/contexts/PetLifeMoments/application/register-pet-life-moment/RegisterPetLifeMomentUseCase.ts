import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentInMemoryRepository } from '../../infrastructure/PetLifeMomentInMemoryRepository';
import { RegisterPetLifeMomentCommand } from './RegisterPetLifeMomentCommand';

export class RegisterPetLifeMomentUseCase {
  constructor(private readonly petLifeMomentRepository: PetLifeMomentInMemoryRepository) {}

  async execute(command: RegisterPetLifeMomentCommand): Promise<void> {
    const petLifeMoment = PetLifeMoment.create(
      command.id,
      command.eventType,
      command.petId,
      command.createdBy,
      command.occurredOn,
      command.description,
    );

    await this.petLifeMomentRepository.save(petLifeMoment);
  }
}
