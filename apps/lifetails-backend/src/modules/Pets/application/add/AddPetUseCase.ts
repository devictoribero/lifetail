import { Pet } from '../../domain/entities/Pet';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { AddPetCommand } from './AddPetCommand';
import { PetGender } from '../../domain/entities/PetGender';
import { StringValueObject } from 'src/modules/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/modules/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/modules/Shared/domain/DateValueObject';

export class AddPetUseCase {
  constructor(private readonly repository: PetInMemoryRepository) {}

  async execute(command: AddPetCommand): Promise<void> {
    const pet = Pet.create(
      command.id,
      new StringValueObject(command.name),
      PetGender.fromPrimitives(command.gender),
      new StringValueObject(command.chipId),
      new BooleanValueObject(command.sterilized),
      new DateValueObject(command.birthdate),
    );

    await this.repository.save(pet);
  }
}
