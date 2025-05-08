import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentRepository } from '../../domain/repositories/PetLifeMomentRepository';
import { AddPetLifeMomentCommand } from './AddPetLifeMomentCommand';
import { PetLifeMomentType } from '../../domain/entities/PetLifeMomentType';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';

export class AddPetLifeMomentCommandHandler {
  constructor(private readonly repository: PetLifeMomentRepository) {}

  async execute(command: AddPetLifeMomentCommand): Promise<void> {
    const petLifeMoment = PetLifeMoment.create(
      command.id,
      PetLifeMomentType.fromPrimitives(command.type),
      command.petId,
      command.createdBy,
      new DateValueObject(command.occurredOn),
      new StringValueObject(command.description),
    );

    await this.repository.save(petLifeMoment);
  }
}
