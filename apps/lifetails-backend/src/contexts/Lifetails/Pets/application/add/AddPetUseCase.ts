import { Pet } from '../../domain/entities/Pet';
import { PetInMemoryRepository } from '../../infrastructure/PetInMemoryRepository';
import { AddPetCommand } from './AddPetCommand';
import { Gender } from '../../../Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Lifetails/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { Species } from '../../domain/entities/PetSpecies';
import { MaxNumberOfPetsReachedException } from '../../domain/exceptions/MaxNumberOfPetsReachedException';

const MAX_NUMBER_OF_PETS = 1;

export class AddPetUseCase {
  constructor(private readonly repository: PetInMemoryRepository) {}

  async execute(command: AddPetCommand): Promise<void> {
    await this.ensureUserCanAddPet(command.userId);

    const newPet = Pet.create(
      command.id,
      Species.fromPrimitives(command.species),
      new StringValueObject(command.name),
      Gender.fromPrimitives(command.gender),
      new StringValueObject(command.chipId),
      new BooleanValueObject(command.sterilized),
      new DateValueObject(command.anniversaryDate),
      command.userId,
    );

    await this.repository.save(newPet);
  }

  private async ensureUserCanAddPet(userId: string): Promise<void> {
    const pets = await this.repository.findByUser(userId);

    if (pets.length >= MAX_NUMBER_OF_PETS) {
      throw new MaxNumberOfPetsReachedException();
    }
  }
}
