import { Injectable } from '@nestjs/common';
import { UUID } from '../../Shared/domain/UUID';
import { Pet } from '../domain/entities/Pet';
import { PetRepository } from '../domain/repositories/PetRepository';

interface InMemoryPet {
  isDeleted: boolean;
  id: string;
  species: string;
  name: string;
  gender: string;
  chipId: string;
  sterilized: boolean;
  anniversaryDate: Date;
  createdAt: Date;
  userId?: string;
}

@Injectable()
export class PetInMemoryRepository implements PetRepository {
  private pets: Map<string, InMemoryPet> = new Map();

  async save(pet: Pet): Promise<void> {
    this.pets.set(pet.getId().toString(), {
      ...pet.toPrimitives(),
      isDeleted: false,
    } as InMemoryPet);
  }

  async remove(id: UUID): Promise<void> {
    const pet = this.pets.get(id.toString());
    if (pet) {
      pet.isDeleted = true;
    }
  }

  async find(id: UUID): Promise<Pet | null> {
    const pet = this.pets.get(id.toString());

    if (!pet || pet.isDeleted) {
      return null;
    }

    return Pet.fromPrimitives(
      pet.id,
      pet.species,
      pet.name,
      pet.gender,
      pet.sterilized,
      pet.anniversaryDate,
      pet.createdAt,
      pet.userId,
      pet.chipId,
    );
  }

  async findByOwner(ownerId: UUID): Promise<Pet[]> {
    const filteredPets: Pet[] = [];

    for (const pet of this.pets.values()) {
      if (!pet.isDeleted && pet.userId === ownerId.toString()) {
        filteredPets.push(
          Pet.fromPrimitives(
            pet.id,
            pet.species,
            pet.name,
            pet.gender,
            pet.sterilized,
            pet.anniversaryDate,
            pet.createdAt,
            pet.userId,
            pet.chipId,
          ),
        );
      }
    }

    return filteredPets;
  }
}
