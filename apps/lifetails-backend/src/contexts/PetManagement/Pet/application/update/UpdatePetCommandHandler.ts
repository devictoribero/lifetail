import { PetRepository } from '../../domain/repositories/PetRepository';
import { UpdatePetCommand } from './UpdatePetCommand';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { Pet } from '../../domain/entities/Pet';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Inject, Injectable } from '@nestjs/common';
import { PET_REPOSITORY } from '../../domain/repositories/PetRepository';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';

@Injectable()
export class UpdatePetCommandHandler implements CommandHandler<UpdatePetCommand> {
  constructor(
    @Inject(PET_REPOSITORY)
    private readonly repository: PetRepository,
  ) {}

  async handle(command: UpdatePetCommand): Promise<void> {
    const pet = await this.getPet(new UUID(command.id));

    if (this.hasValue(command.name)) {
      pet.renameTo(new StringValueObject(command.name));
    }

    if (this.hasValue(command.gender)) {
      pet.changeGenderTo(Gender.fromPrimitives(command.gender));
    }

    if (this.hasValue(command.microchipNumber)) {
      pet.changeMicrochipNumberTo(new StringValueObject(command.microchipNumber));
    }

    if (this.hasValue(command.sterilized)) {
      if (command.sterilized) {
        pet.sterilize();
      } else {
        pet.unsterilize();
      }
    }

    if (this.hasValue(command.anniversaryDate)) {
      pet.changeBirthdateTo(new DateValueObject(command.anniversaryDate));
    }

    await this.repository.save(pet);
  }

  private async getPet(petId: UUID): Promise<Pet> {
    const pet = await this.repository.find(petId);
    if (!pet) {
      throw new PetNotFoundException();
    }

    return pet;
  }

  private hasValue(value: any): boolean {
    return value !== undefined;
  }
}
