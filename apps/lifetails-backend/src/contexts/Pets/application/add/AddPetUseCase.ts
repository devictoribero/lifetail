import { Pet } from '../../domain/entities/Pet';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { AddPetCommand } from './AddPetCommand';
import { Gender } from '../../../Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

export class AddPetUseCase {
  constructor(private readonly repository: PetInMemoryRepository) {}

  async execute(command: AddPetCommand): Promise<void> {
    const pet = Pet.create(
      command.id,
      new StringValueObject(command.name),
      Gender.fromPrimitives(command.gender),
      new StringValueObject(command.chipId),
      new BooleanValueObject(command.sterilized),
      new DateValueObject(command.birthDate),
    );

    await this.repository.save(pet);
  }
}
