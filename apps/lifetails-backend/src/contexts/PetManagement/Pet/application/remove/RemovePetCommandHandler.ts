import { UUID } from 'src/contexts/Shared/domain/UUID';
import { PetNotFoundException } from '../../domain/exceptions/PetNotFoundException';
import { PetRepository } from '../../domain/repositories/PetRepository';
import { RemovePetCommand } from './RemovePetCommand';
import { Inject, Injectable } from '@nestjs/common';
import { PET_REPOSITORY } from '../../domain/repositories/PetRepository';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';
import { EVENT_BUS } from 'src/contexts/Shared/domain/EventBus';
import { EventBus } from 'src/contexts/Shared/domain/EventBus';

@Injectable()
export class RemovePetCommandHandler implements CommandHandler<RemovePetCommand> {
  constructor(
    @Inject(PET_REPOSITORY)
    private readonly repository: PetRepository,
    @Inject(EVENT_BUS)
    private readonly eventBus: EventBus,
  ) {}

  async handle(command: RemovePetCommand): Promise<void> {
    const ud = new UUID(command.id);
    const pet = await this.repository.find(ud);

    if (!pet) {
      throw new PetNotFoundException();
    }

    pet.markAsDeleted();
    await this.repository.save(pet);
    await this.eventBus.publish(pet.pullDomainEvents());
  }
}
