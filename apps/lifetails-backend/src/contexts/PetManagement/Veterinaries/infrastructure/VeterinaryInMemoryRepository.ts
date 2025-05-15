import { Injectable } from '@nestjs/common';
import { Veterinary } from '../domain/entities/Veterinary';
import { VeterinaryRepository } from '../domain/repositories/VeterinaryRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';

interface InMemoryVeterinary {
  isDeleted: boolean;
  id: string;
  name: string;
  address: string | null;
  email: string | null;
  primaryPhone: string | null;
  emergencyPhone: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string | null;
}

@Injectable()
export class VeterinaryInMemoryRepository implements VeterinaryRepository {
  private veterinaries: Map<string, InMemoryVeterinary> = new Map();

  async save(veterinary: Veterinary): Promise<void> {
    const primitives = veterinary.toPrimitives();
    this.veterinaries.set(veterinary.getId().toString(), {
      ...primitives,
      isDeleted: false,
    } as InMemoryVeterinary);
  }

  async remove(id: UUID): Promise<void> {
    const veterinary = this.veterinaries.get(id.toString());
    if (veterinary) {
      veterinary.isDeleted = true;
    }
  }

  async find(id: UUID): Promise<Veterinary | null> {
    const veterinary = this.veterinaries.get(id.toString());

    if (!veterinary || veterinary.isDeleted) {
      return null;
    }

    return Veterinary.fromPrimitives(
      veterinary.id,
      veterinary.name,
      veterinary.address,
      veterinary.email,
      veterinary.primaryPhone,
      veterinary.emergencyPhone,
      veterinary.notes,
      new Date(veterinary.createdAt),
      veterinary.updatedAt ? new Date(veterinary.updatedAt) : null,
    );
  }
}
