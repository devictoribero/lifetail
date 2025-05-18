import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/contexts/Shared/infrastructure/prisma/PrismaService';
import { LifeMoment } from '../domain/entities/LifeMoment';
import { LifeMomentRepository } from '../domain/repositories/LifeMomentRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';

@Injectable()
export class PostgresqlLifeMomentRepository implements LifeMomentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(moment: LifeMoment): Promise<void> {
    const { id, type, theme, petId, occurredOn, description, createdBy, createdAt, updatedAt } =
      moment.toPrimitives();

    await this.prisma.lifeMoment.upsert({
      where: { id },
      update: {
        type: type,
        theme: theme,
        description,
        updatedAt: updatedAt ? new Date(updatedAt) : undefined,
      },
      create: {
        id,
        type: type,
        theme: theme,
        petId,
        occurredOn: new Date(occurredOn),
        description,
        createdBy,
        createdAt: new Date(createdAt),
        updatedAt: updatedAt ? new Date(updatedAt) : undefined,
      },
    });
  }

  async remove(id: UUID): Promise<void> {
    // Since this is a soft delete per the interface comment, we could mark it as deleted
    // However, the Prisma schema doesn't show a deletedAt field, so we'll do a hard delete
    await this.prisma.lifeMoment.delete({
      where: { id: id.toString() },
    });
  }

  async find(id: UUID): Promise<LifeMoment | null> {
    const lifeMoment = await this.prisma.lifeMoment.findUnique({
      where: { id: id.toString() },
    });

    if (!lifeMoment) {
      return null;
    }

    return this.mapToDomainLifeMoment(lifeMoment);
  }

  async search(petId: UUID): Promise<LifeMoment[]> {
    const lifeMoments = await this.prisma.lifeMoment.findMany({
      where: {
        petId: petId.toString(),
      },
    });

    return lifeMoments.map(this.mapToDomainLifeMoment);
  }

  private mapToDomainLifeMoment(lifeMoment: any): LifeMoment {
    return LifeMoment.fromPrimitives({
      id: lifeMoment.id,
      type: lifeMoment.type,
      theme: lifeMoment.theme,
      petId: lifeMoment.petId,
      createdBy: lifeMoment.createdBy,
      occurredOn: lifeMoment.occurredOn,
      description: lifeMoment.description,
      createdAt: lifeMoment.createdAt,
      updatedAt: lifeMoment.updatedAt,
    });
  }
}
