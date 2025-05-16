import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import {
  VeterinaryRepository,
  VETERINARY_REPOSITORY,
} from '../../domain/repositories/VeterinaryRepository';
import { UpdateVeterinaryCommand } from './UpdateVeterinaryCommand';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';
import { VeterinaryNotFoundException } from '../../domain/exceptions/VeterinaryNotFoundException';
import { Veterinary } from '../../domain/entities/Veterinary';

@Injectable()
export class UpdateVeterinaryCommandHandler implements CommandHandler<UpdateVeterinaryCommand> {
  constructor(
    @Inject(VETERINARY_REPOSITORY)
    private readonly repository: VeterinaryRepository,
  ) {}

  async handle(command: UpdateVeterinaryCommand): Promise<void> {
    const id = new UUID(command.id);
    const veterinary = await this.getVeterinary(id);

    if (command.name !== undefined) {
      veterinary.rename(new StringValueObject(command.name));
    }

    if (command.address !== undefined) {
      const address = command.address ? new StringValueObject(command.address) : null;
      veterinary.relocate(address);
    }

    if (command.email !== undefined) {
      const email = command.email ? new EmailValueObject(command.email) : null;
      veterinary.changeContactEmail(email);
    }

    if (command.primaryPhone !== undefined) {
      const primaryPhone = command.primaryPhone
        ? new StringValueObject(command.primaryPhone)
        : null;
      veterinary.addPrimaryPhone(primaryPhone);
    }

    if (command.emergencyPhone !== undefined) {
      const emergencyPhone = command.emergencyPhone
        ? new StringValueObject(command.emergencyPhone)
        : null;
      veterinary.addEmergencyPhone(emergencyPhone);
    }

    if (command.notes !== undefined) {
      const notes = command.notes ? new StringValueObject(command.notes) : null;
      veterinary.documentAdditionalInfo(notes);
    }

    await this.repository.save(veterinary);
  }

  private async getVeterinary(id: UUID): Promise<Veterinary> {
    const veterinary = await this.repository.find(id);
    if (!veterinary) {
      throw new VeterinaryNotFoundException(id);
    }
    return veterinary;
  }
}
