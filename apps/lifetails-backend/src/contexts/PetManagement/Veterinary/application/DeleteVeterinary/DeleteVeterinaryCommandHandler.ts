import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import {
  VeterinaryRepository,
  VETERINARY_REPOSITORY,
} from '../../domain/repositories/VeterinaryRepository';
import { DeleteVeterinaryCommand } from './DeleteVeterinaryCommand';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';
import { VeterinaryNotFoundException } from '../../domain/exceptions/VeterinaryNotFoundException';
import { Veterinary } from '../../domain/entities/Veterinary';

@Injectable()
export class DeleteVeterinaryCommandHandler implements CommandHandler<DeleteVeterinaryCommand> {
  constructor(
    @Inject(VETERINARY_REPOSITORY)
    private readonly repository: VeterinaryRepository,
  ) {}

  async handle(command: DeleteVeterinaryCommand): Promise<void> {
    const id = new UUID(command.id);
    const veterinary = await this.getVeterinary(id);
    veterinary.markAsDeleted();

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
