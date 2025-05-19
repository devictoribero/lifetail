import { Pet } from '../domain/entities/Pet';
import { PetRepository } from '../domain/repositories/PetRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PetInMemoryRepository implements PetRepository {
  private pets: Map<string, Pet> = new Map();

  async save(pet: Pet): Promise<void> {
    this.pets.set(pet.getId().toString(), pet);
  }

  async remove(id: UUID): Promise<void> {
    this.pets.delete(id.toString());
  }

  async find(id: UUID): Promise<Pet | null> {
    const pet = this.pets.get(id.toString());
    return pet || null;
  }

  async findByOwner(ownerId: UUID): Promise<Pet[]> {
    return Array.from(this.pets.values()).filter(
      (pet) => pet.getOwnerId()?.toString() === ownerId.toString(),
    );
  }
}
