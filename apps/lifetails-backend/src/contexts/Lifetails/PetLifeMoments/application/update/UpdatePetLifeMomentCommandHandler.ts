import { PetLifeMomentRepository } from '../../domain/repositories/PetLifeMomentRepository';
import { UpdatePetLifeMomentCommand } from './UpdatePetLifeMomentCommand';
import { PetLifeMomentNotFoundException } from '../../domain/exceptions/PetLifeMomentNotFoundException';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';

export class UpdatePetLifeMomentCommandHandler {
  constructor(private readonly repository: PetLifeMomentRepository) {}

  async execute(command: UpdatePetLifeMomentCommand): Promise<void> {
    const petLifeMoment = await this.getPetLifeMoment(command.id);

    if (this.hasField(command.description)) {
      const newDescription = new StringValueObject(command.description);
      petLifeMoment.updateDescription(newDescription);
    }

    if (this.hasField(command.occurredOn)) {
      const newDate = new DateValueObject(command.occurredOn);
      petLifeMoment.reschedule(newDate);
    }

    await this.repository.save(petLifeMoment);
  }

  private async getPetLifeMoment(id: string): Promise<PetLifeMoment> {
    const petLifeMoment = await this.repository.find(id);
    if (!petLifeMoment) {
      throw new PetLifeMomentNotFoundException(id);
    }
    return petLifeMoment;
  }

  private hasField(value: any): boolean {
    return value !== undefined;
  }
}
