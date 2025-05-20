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
      ownerId,
      species,
      gender,
      name,
      sterilized,
      birthDate,
      arrivalDate,
      color,
      microchipNumber,
      createdAt,
      updatedAt,
      deletedAt,
    } = pet.toPrimitives();

    await this.prisma.pet.upsert({
      where: { id },
      update: {
        ownerId,
        species,
        gender,
        name,
        sterilized,
        birthDate: birthDate ? new Date(birthDate) : null,
        arrivalDate: arrivalDate ? new Date(arrivalDate) : null,
        color,
        microchipNumber,
        updatedAt: updatedAt ? new Date(updatedAt) : null,
        deletedAt: deletedAt ? new Date(deletedAt) : null,
      },
      create: {
        id,
        ownerId,
        species,
        gender,
        name,
        sterilized,
        birthDate: birthDate ? new Date(birthDate) : null,
        arrivalDate: arrivalDate ? new Date(arrivalDate) : null,
        color,
        microchipNumber,
        createdAt: new Date(createdAt),
        updatedAt: updatedAt ? new Date(updatedAt) : null,
        deletedAt: deletedAt ? new Date(deletedAt) : null,
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

    if (!pet) return null;

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
      ownerId: pet.ownerId,
      species: pet.species,
      gender: pet.gender,
      name: pet.name,
      sterilized: pet.sterilized,
      birthDate: pet.birthDate ?? new Date(),
      arrivalDate: pet.arrivalDate ?? new Date(),
      color: pet.color,
      microchipNumber: pet.microchipNumber,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
      deletedAt: pet.deletedAt,
    });
  }
}
