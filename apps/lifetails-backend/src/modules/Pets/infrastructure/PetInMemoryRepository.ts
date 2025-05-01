import { Pet } from '../domain/entities/Pet';
import { PetRepository } from '../domain/repositories/PetRepository';

interface InMemoryPet {
  isDeleted: boolean;
  id: string;
  name: string;
  gender: string;
  chipId: string;
  sterilized: boolean;
  birthdate: Date;
}

export class PetInMemoryRepository implements PetRepository {
  private pets: Map<string, InMemoryPet> = new Map();

  async save(pet: Pet): Promise<void> {
    this.pets.set(pet.getId(), {
      ...pet.toPrimitives(),
      isDeleted: false,
    } as InMemoryPet);
  }

  async remove(id: string): Promise<void> {
    const pet = this.pets.get(id);
    if (pet) {
      pet.isDeleted = true;
    }
  }

  async find(id: string): Promise<Pet | null> {
    const pet = this.pets.get(id);

    if (!pet || pet.isDeleted) {
      return null;
    }

    return Pet.fromPrimitives(
      pet.id,
      pet.name,
      pet.gender,
      pet.chipId,
      pet.sterilized,
      pet.birthdate,
    );
  }

  async findAll(): Promise<Pet[]> {
    const pets: Pet[] = [];

    for (const pet of this.pets.values()) {
      if (!pet.isDeleted) {
        pets.push(
          Pet.fromPrimitives(
            pet.id,
            pet.name,
            pet.gender,
            pet.chipId,
            pet.sterilized,
            pet.birthdate,
          ),
        );
      }
    }

    return pets;
  }
}
