import { Pet } from '../../domain/entities/Pet';
import { PET_REPOSITORY, PetRepository } from '../../domain/repositories/PetRepository';
import { AddPetCommand } from './AddPetCommand';
import { Gender } from '../../../Shared/domain/Gender';
import { StringValueObject } from 'src/contexts/Lifetails/Shared/domain/StringValueObject';
import { BooleanValueObject } from 'src/contexts/Lifetails/Shared/domain/BooleanValueObject';
import { DateValueObject } from 'src/contexts/Lifetails/Shared/domain/DateValueObject';
import { Species } from '../../domain/entities/PetSpecies';
import { MaxNumberOfPetsReachedException } from '../../domain/exceptions/MaxNumberOfPetsReachedException';
import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { Inject, Injectable } from '@nestjs/common';
import { EVENT_BUS } from 'src/contexts/Lifetails/Shared/domain/EventBus';
import { EventBus } from 'src/contexts/Lifetails/Shared/domain/EventBus';

const MAX_NUMBER_OF_PETS = 1;

@Injectable()
export class AddPetCommandHandler {
  constructor(
    @Inject(PET_REPOSITORY)
    private readonly repository: PetRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: AddPetCommand): Promise<void> {
    const ownerId = new UUID(command.userId);
    await this.ensureOwnerCanAddPet(ownerId);

    const newPet = Pet.create(
      new UUID(command.id),
      Species.fromPrimitives(command.species),
      new StringValueObject(command.name),
      Gender.fromPrimitives(command.gender),
      new BooleanValueObject(command.sterilized),
      new DateValueObject(command.anniversaryDate),
      new UUID(command.userId),
    );

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
