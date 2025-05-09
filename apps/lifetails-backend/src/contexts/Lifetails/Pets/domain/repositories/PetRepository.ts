import { Pet } from '../entities/Pet';

export const PetRepositorySymbol = Symbol('PetRepository');

export interface PetRepository {
  save(pet: Pet): Promise<void>;
  remove(id: string): Promise<void>;
  find(id: string): Promise<Pet | null>;
  findByOwner(ownerId: string): Promise<Pet[]>;
}
