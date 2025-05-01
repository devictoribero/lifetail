import { Pet } from '../entities/Pet';

export interface PetRepository {
  save(pet: Pet): Promise<void>;
  remove(id: string): Promise<void>;
  find(id: string): Promise<Pet | null>;
  findAll(): Promise<Pet[]>;
}
