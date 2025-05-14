import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PetAddedDomainEvent } from '../../../../PetManagement/Pets/domain/PetAddedDomainEvent';
import { AddLifeMomentCommand } from '../add/AddLifeMomentCommand';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LifeMomentType } from '../../domain/entities/LifeMomentType';
import { AddLifeMomentCommandHandler } from '../add/AddLifeMomentCommandHandler';

@Injectable()
export class AddArrivalLifeMomentOnPetAdded {
  private readonly logger = new Logger(AddArrivalLifeMomentOnPetAdded.name);

  constructor(private readonly commandHandler: AddLifeMomentCommandHandler) {}

  @OnEvent(PetAddedDomainEvent.EVENT_NAME)
  async handle(event: {
    aggregateId: string;
    eventId: string;
    occurredOn: Date;
    attributes: { name: string };
  }): Promise<void> {
    this.logger.log(event);
    this.logger.log(
      `Creating arrival life moment for new pet: ${event.attributes.name} (ID: ${event.aggregateId})`,
    );

    const lifeMomentId = UUID.create().toString();
    const petId = event.aggregateId;
    // Assuming the creator is the same user who added the pet
    const createdBy = event.aggregateId; // This could be changed if needed
    const occurredOn = event.occurredOn;
    const description = `${event.attributes.name} has arrived!`;

    const command = new AddLifeMomentCommand(
      lifeMomentId,
      LifeMomentType.Arrival.toString(),
      petId,
      createdBy,
      occurredOn,
      description,
    );
    await this.commandHandler.handle(command);
  }
}
