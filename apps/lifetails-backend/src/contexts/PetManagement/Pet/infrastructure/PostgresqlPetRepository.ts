import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/contexts/Shared/infrastructure/prisma/PrismaService';
import { Pet } from '../domain/entities/Pet';
import { PetRepository } from '../domain/repositories/PetRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';

@Injectable()
export class PostgresqlPetRepository implements PetRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(pet: Pet): Promise<void> {
    const {
      id,
      species,
      name,
      gender,
      sterilized,
      birthDate,
      arrivalDate,
      createdAt,
      ownerId,
      microchipNumber,
    } = pet.toPrimitives();

    await this.prisma.pet.upsert({
      where: { id },
      update: {
        species: this.mapToPrismaSpecies(species),
        name,
        gender: this.mapToPrismaGender(gender),
        sterilized,
        birthDate: birthDate ? new Date(birthDate) : null,
        ownerId,
        microchipNumber,
      },
      create: {
        id,
        species: this.mapToPrismaSpecies(species),
        name,
        gender: this.mapToPrismaGender(gender),
        sterilized,
        birthDate: birthDate ? new Date(birthDate) : null,
        arrivalDate: arrivalDate ? new Date(arrivalDate) : null,
        createdAt: new Date(createdAt),
        ownerId,
        microchipNumber,
      },
    });
  }

  async remove(id: UUID): Promise<void> {
    await this.prisma.pet.delete({
      where: { id: id.toString() },
    });
  }

  async find(id: UUID): Promise<Pet | null> {
    const pet = await this.prisma.pet.findUnique({
      where: { id: id.toString() },
    });

    if (!pet) {
      return null;
    }

    return this.mapToDomainPet(pet);
  }

  async findByOwner(ownerId: UUID): Promise<Pet[]> {
    const pets = await this.prisma.pet.findMany({
      where: { ownerId: ownerId.toString() },
    });

    return pets.map((pet) => this.mapToDomainPet(pet));
  }

  private mapToDomainPet(pet: any): Pet {
    return Pet.fromPrimitives({
      id: pet.id,
      species: this.mapToDomainSpecies(pet.species),
      name: pet.name,
      gender: this.mapToDomainGender(pet.gender),
      sterilized: pet.sterilized,
      birthDate: pet.birthDate ?? new Date(),
      arrivalDate: pet.arrivalDate ?? new Date(),
      color: pet.color,
      createdAt: pet.createdAt,
      ownerId: pet.ownerId,
      microchipNumber: pet.microchipNumber,
    });
  }

  // Map domain species to Prisma enum format
  private mapToPrismaSpecies(species: string): 'DOG' | 'CAT' {
    switch (species) {
      case 'Dog':
        return 'DOG';
      case 'Cat':
        return 'CAT';
      default:
        throw new Error(`Unsupported species: ${species}`);
    }
  }

  // Map Prisma enum format to domain species
  private mapToDomainSpecies(species: string): string {
    switch (species) {
      case 'DOG':
        return 'Dog';
      case 'CAT':
        return 'Cat';
      default:
        return 'Dog'; // Default fallback
    }
  }

  // Map domain gender to Prisma enum format
  private mapToPrismaGender(gender: string): 'MALE' | 'FEMALE' {
    switch (gender) {
      case 'Male':
        return 'MALE';
      case 'Female':
        return 'FEMALE';
      default:
        throw new Error(`Unsupported gender: ${gender}`);
    }
  }

  // Map Prisma enum format to domain gender
  private mapToDomainGender(gender: string): string {
    switch (gender) {
      case 'MALE':
        return 'Male';
      case 'FEMALE':
        return 'Female';
      default:
        return 'Male'; // Default fallback
    }
  }
}
