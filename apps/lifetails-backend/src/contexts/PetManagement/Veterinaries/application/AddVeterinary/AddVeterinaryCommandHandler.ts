import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { StringValueObject } from 'src/contexts/Shared/domain/StringValueObject';
import { Veterinary } from '../../domain/entities/Veterinary';
import {
  VeterinaryRepository,
  VETERINARY_REPOSITORY,
} from '../../domain/repositories/VeterinaryRepository';
import { AddVeterinaryCommand } from './AddVeterinaryCommand';
import { CommandHandler } from 'src/contexts/Shared/domain/CommandHandler';

@Injectable()
export class AddVeterinaryCommandHandler implements CommandHandler<AddVeterinaryCommand> {
  constructor(
    @Inject(VETERINARY_REPOSITORY)
    private readonly repository: VeterinaryRepository,
  ) {}

  async handle(command: AddVeterinaryCommand): Promise<void> {
    const id = new UUID(command.id);
    const name = new StringValueObject(command.name);

    const veterinary = Veterinary.create({ id, name });

    await this.repository.save(veterinary);
  }
}
