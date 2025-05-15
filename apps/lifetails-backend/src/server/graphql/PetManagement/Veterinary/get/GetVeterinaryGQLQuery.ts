import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetVeterinaryQueryHandler } from 'src/contexts/PetManagement/Veterinaries/application/GetVeterinary/GetVeterinaryQueryHandler';
import { GetVeterinaryQuery } from 'src/contexts/PetManagement/Veterinaries/application/GetVeterinary/GetVeterinaryQuery';
import { VeterinaryNotFoundException } from 'src/contexts/PetManagement/Veterinaries/domain/exceptions/VeterinaryNotFoundException';
import { GetVeterinaryInput } from './GetVeterinaryInput';
import { Veterinary } from './Veterinary';
import { UseGuards } from '@nestjs/common';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';

@Resolver()
@UseGuards(AuthenticationRequired)
export class GetVeterinaryGQLQuery {
  constructor(private readonly queryHandler: GetVeterinaryQueryHandler) {}

  @Query(() => Veterinary)
  async getVeterinary(@Args('input') input: GetVeterinaryInput): Promise<Veterinary> {
    try {
      const query = new GetVeterinaryQuery(input.id);
      const veterinary = await this.queryHandler.handle(query);

      return veterinary.toPrimitives();
    } catch (error) {
      if (error instanceof VeterinaryNotFoundException) {
        throw new Error(`Veterinary not found: ${input.id}`);
      }
      throw error;
    }
  }
}
