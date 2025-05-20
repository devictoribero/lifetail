import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/contexts/Shared/infrastructure/prisma/PrismaService';
import { User } from '../domain/entities/User';
import { UserRepository } from '../domain/repositories/UserRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';

@Injectable()
export class PostgresqlUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    const { id, accountId, nickname, createdAt, preferredLanguage, updatedAt, deletedAt } =
      user.toPrimitives();

    await this.prisma.user.upsert({
      where: { id },
      update: {
        nickname: nickname,
        preferredLanguage,
      },
      create: {
        id,
        accountId,
        nickname: nickname,
        preferredLanguage,
        createdAt: new Date(createdAt),
        updatedAt: updatedAt ? new Date(updatedAt) : null,
        deletedAt: deletedAt ? new Date(deletedAt) : null,
      },
    });
  }

  async getByAccountId(accountId: UUID): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { accountId: accountId.toString() },
    });

    if (!user) return null;

    return User.fromPrimitives({
      id: user.id,
      accountId: user.accountId,
      nickname: user.nickname,
      preferredLanguage: user.preferredLanguage,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    });
  }

  async getById(id: UUID): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: id.toString() },
    });

    if (!user) {
      return null;
    }

    return User.fromPrimitives({
      id: user.id,
      accountId: user.accountId,
      nickname: user.nickname,
      preferredLanguage: user.preferredLanguage,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    });
  }
}
