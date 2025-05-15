import { Injectable } from '@nestjs/common';
import { Pet } from '../domain/entities/Pet';
import { PetRepository } from '../domain/repositories/PetRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';

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
  ownerId?: string;
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

    return Pet.fromPrimitives({
      id: pet.id,
      species: pet.species,
      name: pet.name,
      gender: pet.gender,
      sterilized: pet.sterilized,
      anniversaryDate: pet.anniversaryDate,
      createdAt: pet.createdAt,
      ownerId: pet.ownerId,
      chipId: pet.chipId,
    });
  }

  async findByOwner(ownerId: UUID): Promise<Pet[]> {
    const filteredPets: Pet[] = [];

    for (const pet of this.pets.values()) {
      if (!pet.isDeleted && pet.ownerId === ownerId.toString()) {
        filteredPets.push(
          Pet.fromPrimitives({
            id: pet.id,
            species: pet.species,
            name: pet.name,
            gender: pet.gender,
            sterilized: pet.sterilized,
            anniversaryDate: pet.anniversaryDate,
            createdAt: pet.createdAt ? pet.createdAt : null,
            ownerId: pet.ownerId,
            chipId: pet.chipId,
          }),
        );
      }
    }

    return filteredPets;
  }
}
