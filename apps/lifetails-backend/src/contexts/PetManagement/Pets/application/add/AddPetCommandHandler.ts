import { Pet } from '../../domain/entities/Pet';
import { PET_REPOSITORY, PetRepository } from '../../domain/repositories/PetRepository';
import { AddPetCommand } from './AddPetCommand';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Shared/domain/DateValueObject';
import { Species } from '../../domain/entities/PetSpecies';
import { MaxNumberOfPetsReachedException } from '../../domain/exceptions/MaxNumberOfPetsReachedException';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Inject, Injectable } from '@nestjs/common';
import { EVENT_BUS } from 'src/contexts/Shared/domain/EventBus';
import { EventBus } from 'src/contexts/Shared/domain/EventBus';
import { Gender } from 'src/contexts/Shared/domain/Gender';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';

const MAX_NUMBER_OF_PETS = 1;

@Injectable()
export class AddPetCommandHandler implements CommandHandler<AddPetCommand> {
  constructor(
    @Inject(PET_REPOSITORY)
    private readonly repository: PetRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {}

  async handle(command: AddPetCommand): Promise<void> {
    const ownerId = new UUID(command.userId);
    await this.ensureOwnerCanAddPet(ownerId);

    const newPet = Pet.create({
      id: new UUID(command.id),
      species: Species.fromPrimitives(command.species),
      name: new StringValueObject(command.name),
      gender: Gender.fromPrimitives(command.gender),
      sterilized: new BooleanValueObject(command.sterilized),
      anniversaryDate: new DateValueObject(command.anniversaryDate),
      ownerId: new UUID(command.userId),
    });

    await this.repository.save(newPet);
    await this.eventBus.publish(newPet.pullDomainEvents());
  }

  private async ensureOwnerCanAddPet(ownerId: UUID): Promise<void> {
    const pets = await this.repository.findByOwner(ownerId);

    if (pets.length >= MAX_NUMBER_OF_PETS) {
      throw new MaxNumberOfPetsReachedException();
    }
  }
}
