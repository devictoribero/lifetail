import { PetRepository } from '../../domain/repositories/PetRepository';
import { UpdatePetCommand } from './UpdatePetCommand';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { PetGender } from '../../domain/entities/PetGender';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';

export class UpdatePetUseCase {
  constructor(private readonly repository: PetRepository) {}

  async execute(command: UpdatePetCommand): Promise<void> {
    const pet = await this.repository.find(command.id);

    if (!pet) {
      throw new PetNotFoundException(command.id);
    }

    if (this.hasValue(command.name)) {
      pet.renameTo(new StringValueObject(command.name));
    }

    if (this.hasValue(command.gender)) {
      pet.changeGenderTo(PetGender.fromPrimitives(command.gender));
    }

    if (this.hasValue(command.chipId)) {
      pet.changeChipIdTo(new StringValueObject(command.chipId));
    }

    if (this.hasValue(command.sterilized)) {
      if (command.sterilized) {
        pet.sterilize();
      } else {
        pet.unsterilize();
      }
    }

    if (this.hasValue(command.birthdate)) {
      pet.changeBirthdateTo(new DateValueObject(command.birthdate));
    }

    await this.repository.save(pet);
  }

  private hasValue(value: any): boolean {
    return value !== undefined;
  }
}
