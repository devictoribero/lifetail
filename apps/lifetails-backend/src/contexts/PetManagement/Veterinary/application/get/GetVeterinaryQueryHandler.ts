import { Inject, Injectable } from '@nestjs/common';
import { QueryHandler } from 'src/contexts/Shared/domain/QueryHandler';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Veterinary } from '../../domain/entities/Veterinary';
import { VeterinaryNotFoundException } from '../../domain/exceptions/VeterinaryNotFoundException';
import {
  VeterinaryRepository,
  VETERINARY_REPOSITORY,
} from '../../domain/repositories/VeterinaryRepository';
import { GetVeterinaryQuery } from './GetVeterinaryQuery';

@Injectable()
export class GetVeterinaryQueryHandler implements QueryHandler<GetVeterinaryQuery, Veterinary> {
  constructor(
    @Inject(VETERINARY_REPOSITORY)
    private readonly repository: VeterinaryRepository,
  ) {}

  async handle(query: GetVeterinaryQuery): Promise<Veterinary> {
    const id = new UUID(query.id);
    const veterinary = await this.repository.find(id);

    if (!veterinary) {
      throw new VeterinaryNotFoundException();
    }

    return veterinary;
  }
}
