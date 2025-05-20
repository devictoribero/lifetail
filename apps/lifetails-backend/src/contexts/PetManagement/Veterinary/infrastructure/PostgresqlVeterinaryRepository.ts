import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/contexts/Shared/infrastructure/prisma/PrismaService';
import { Veterinary } from '../domain/entities/Veterinary';
import { VeterinaryRepository } from '../domain/repositories/VeterinaryRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';

@Injectable()
export class PostgresqlVeterinaryRepository implements VeterinaryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(veterinary: Veterinary): Promise<void> {
    const {
      id,
      name,
      address,
      email,
      primaryPhone,
      emergencyPhone,
      notes,
      createdAt,
      updatedAt,
      deletedAt,
    } = veterinary.toPrimitives();

    await this.prisma.veterinary.upsert({
      where: { id },
      update: {
        name,
        address,
        email,
        primaryPhone,
        emergencyPhone,
        notes,
        createdAt: new Date(createdAt),
        updatedAt: updatedAt ? new Date(updatedAt) : null,
        deletedAt: deletedAt ? new Date(deletedAt) : null,
      },
      create: {
        id,
        name,
        address,
        email,
        primaryPhone,
        emergencyPhone,
        notes,
        createdAt: new Date(createdAt),
        updatedAt: updatedAt ? new Date(updatedAt) : null,
        deletedAt: deletedAt ? new Date(deletedAt) : null,
      },
    });
  }

  async find(id: UUID): Promise<Veterinary | null> {
    const veterinary = await this.prisma.veterinary.findUnique({
      where: { id: id.toString() },
    });

    if (!veterinary || veterinary.deletedAt) return null;

    return Veterinary.fromPrimitives({
      id: veterinary.id,
      name: veterinary.name,
      address: veterinary.address,
      email: veterinary.email,
      primaryPhone: veterinary.primaryPhone,
      emergencyPhone: veterinary.emergencyPhone,
      notes: veterinary.notes,
      createdAt: veterinary.createdAt,
      updatedAt: veterinary.updatedAt,
      deletedAt: veterinary.deletedAt,
    });
  }
}
