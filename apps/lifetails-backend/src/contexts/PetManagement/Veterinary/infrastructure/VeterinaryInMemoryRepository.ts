import { Injectable } from '@nestjs/common';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Veterinary } from '../domain/entities/Veterinary';
import { VeterinaryRepository } from '../domain/repositories/VeterinaryRepository';

@Injectable()
export class VeterinaryInMemoryRepository implements VeterinaryRepository {
  private veterinaries: Map<string, Veterinary> = new Map();

  async save(veterinary: Veterinary): Promise<void> {
    this.veterinaries.set(veterinary.getId().toString(), veterinary);
  }

  async find(id: UUID): Promise<Veterinary | null> {
    const veterinary = this.veterinaries.get(id.toString());
    return veterinary || null;
  }

  // Method to help with testing
  getAll(): Veterinary[] {
    return Array.from(this.veterinaries.values());
  }

  // Method to clear all data (useful for test reset)
  clear(): void {
    this.veterinaries.clear();
  }
}
