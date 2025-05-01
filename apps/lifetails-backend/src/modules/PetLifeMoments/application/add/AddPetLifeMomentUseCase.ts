import { PetLifeMoment } from '../../domain/entities/PetLifeMoment';
import { PetLifeMomentInMemoryRepository } from '../../infrastructure/PetLifeMomentInMemoryRepository';
import { AddPetLifeMomentCommand } from './AddPetLifeMomentCommand';
import { PetLifeMomentType } from '../../domain/entities/PetLifeMomentType';
import { StringValueObject } from 'src/modules/Shared/domain/StringValueObject';
import { DateValueObject } from 'src/modules/Shared/domain/DateValueObject';

export class AddPetLifeMomentUseCase {
  constructor(private readonly repository: PetLifeMomentInMemoryRepository) {}

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
