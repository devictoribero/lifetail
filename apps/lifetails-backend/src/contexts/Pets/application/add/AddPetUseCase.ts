import { Pet } from '../../domain/entities/Pet';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { AddPetCommand } from './AddPetCommand';
import { Gender } from '../../../Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { Species } from '../../domain/entities/PetSpecies';

export class AddPetUseCase {
  constructor(private readonly repository: PetInMemoryRepository) {}

  async execute(command: AddPetCommand): Promise<void> {
    const pet = Pet.create(
      command.id,
      Species.fromPrimitives(command.species),
      new StringValueObject(command.name),
      Gender.fromPrimitives(command.gender),
      new StringValueObject(command.chipId),
      new BooleanValueObject(command.sterilized),
      new DateValueObject(command.anniversaryDate),
      command.userId,
    );

    await this.repository.save(pet);
  }
}
