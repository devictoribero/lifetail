import { PetLifeMomentRepository } from '../../domain/repositories/PetLifeMomentRepository';
import { UpdatePetLifeMomentCommand } from './UpdatePetLifeMomentCommand';
import { PetLifeMomentNotFoundException } from '../../domain/exceptions/PetLifeMomentNotFoundException';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

export class UpdatePetLifeMomentUseCase {
  constructor(private readonly repository: PetLifeMomentRepository) {}

  async execute(command: UpdatePetLifeMomentCommand): Promise<void> {
    const petLifeMoment = await this.repository.find(command.id);

    if (!petLifeMoment) {
      throw new PetLifeMomentNotFoundException(command.id);
    }

    if (this.hasField(command.description)) {
      const newDescription = new StringValueObject(command.description);
      petLifeMoment.updateDescription(newDescription);
    }

    if (this.hasField(command.occurredOn)) {
      const newDate = new DateValueObject(command.occurredOn);
      petLifeMoment.reschedule(newDate);
    }

    if (this.hasField(command.petId)) {
      petLifeMoment.reassignToCat(command.petId);
    }

    await this.repository.save(petLifeMoment);
  }

  private hasField(value: any): boolean {
    return value !== undefined;
  }
}
