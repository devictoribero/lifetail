import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/contexts/Shared/infrastructure/prisma/PrismaService';
import { User } from '../domain/entities/User';
import { UserRepository } from '../domain/repositories/UserRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';

@Injectable()
export class PostgresqlUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    const { id, accountId, nickname, createdAt, preferredLanguage } = user.toPrimitives();

    await this.prisma.user.upsert({
      where: { id },
      update: {
        nickname: nickname,
        preferredLanguage: preferredLanguage,
      },
      create: {
        id,
        accountId,
        nickname: nickname,
        createdAt: new Date(createdAt),
        preferredLanguage: preferredLanguage,
      },
    });
  }

  async getByAccountId(accountId: UUID): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { accountId: accountId.toString() },
    });

    if (!user) {
      return null;
    }

    return User.fromPrimitives({
      id: user.id,
      accountId: user.accountId,
      nickname: user.nickname,
      createdAt: user.createdAt,
      preferredLanguage: user.preferredLanguage,
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
      createdAt: user.createdAt,
      preferredLanguage: user.preferredLanguage,
    });
  }
}
