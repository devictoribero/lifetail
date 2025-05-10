import { Pet } from '../../domain/entities/Pet';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { AddPetCommand } from './AddPetCommand';
import { Gender } from '../../../Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Lifetails/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { Species } from '../../domain/entities/PetSpecies';
import { MaxNumberOfPetsReachedException } from '../../domain/exceptions/MaxNumberOfPetsReachedException';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';

const MAX_NUMBER_OF_PETS = 1;

export class AddPetCommandHandler {
  constructor(private readonly repository: PetRepository) {}

  async execute(command: AddPetCommand): Promise<void> {
    const ownerId = new UUID(command.userId);
    await this.ensureOwnerCanAddPet(ownerId);

    const newPet = Pet.create(
      command.id,
      Species.fromPrimitives(command.species),
      new StringValueObject(command.name),
      Gender.fromPrimitives(command.gender),
      new BooleanValueObject(command.sterilized),
      new DateValueObject(command.anniversaryDate),
      command.userId,
    );

    await this.repository.save(newPet);
  }

  private async ensureOwnerCanAddPet(ownerId: UUID): Promise<void> {
    const pets = await this.repository.findByOwner(ownerId);

    if (pets.length >= MAX_NUMBER_OF_PETS) {
      throw new MaxNumberOfPetsReachedException();
    }
  }
}
