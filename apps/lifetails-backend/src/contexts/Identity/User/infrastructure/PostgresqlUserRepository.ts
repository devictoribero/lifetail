import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/contexts/Shared/infrastructure/prisma/PrismaService';
import { User } from '../domain/entities/User';
import { UserRepository } from '../domain/repositories/UserRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { LanguageCodeEnum } from 'src/contexts/Shared/domain/LanguageCode';

@Injectable()
export class PostgresqlUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    const { id, accountId, nickname, createdAt, preferredLanguage } = user.toPrimitives();

    await this.prisma.user.upsert({
      where: { id },
      update: {
        nickname: nickname,
        preferredLanguage: this.mapToPrismaLanguageCode(preferredLanguage),
      },
      create: {
        id,
        accountId,
        nickname: nickname,
        createdAt: new Date(createdAt),
        preferredLanguage: this.mapToPrismaLanguageCode(preferredLanguage),
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
      preferredLanguage: this.mapToDomainLanguageCode(user.preferredLanguage),
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
      preferredLanguage: this.mapToDomainLanguageCode(user.preferredLanguage),
    });
  }

  // Map domain language code to Prisma enum format
  private mapToPrismaLanguageCode(code: string): 'EN' | 'ES' {
    switch (code) {
      case LanguageCodeEnum.English:
        return 'EN';
      case LanguageCodeEnum.Spanish:
        return 'ES';
      default:
        return 'EN'; // Default fallback
    }
  }

  // Map Prisma enum format to domain language code
  private mapToDomainLanguageCode(code: string): string {
    switch (code) {
      case 'EN':
        return LanguageCodeEnum.English;
      case 'ES':
        return LanguageCodeEnum.Spanish;
      default:
        return LanguageCodeEnum.English; // Default fallback
    }
  }
}
