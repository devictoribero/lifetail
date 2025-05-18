import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/contexts/Shared/infrastructure/prisma/PrismaService';
import { EmailValueObject } from 'src/contexts/Shared/domain/EmailValueObject';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Account } from '../domain/entities/Account';
import { AccountRepository } from '../domain/repositories/AccountRepository';

@Injectable()
export class PostgresqlAccountRepository implements AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(account: Account): Promise<void> {
    const { id, email, password, createdAt, deletedAt } = account.toPrimitives();

    await this.prisma.account.upsert({
      where: { id },
      update: {
        email,
        password,
        deletedAt: deletedAt ? new Date(deletedAt) : null,
      },
      create: {
        id,
        email,
        password,
        createdAt: new Date(createdAt),
        deletedAt: deletedAt ? new Date(deletedAt) : null,
      },
    });
  }

  async findByEmail(email: EmailValueObject): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { email: email.toString() },
    });

    if (!account) {
      return null;
    }

    return Account.fromPrimitives({
      id: account.id,
      email: account.email,
      password: account.password,
      createdAt: account.createdAt,
      deletedAt: account.deletedAt,
    });
  }

  async find(id: UUID): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: { id: id.toString() },
    });

    if (!account) {
      return null;
    }

    return Account.fromPrimitives({
      id: account.id,
      email: account.email,
      password: account.password,
      createdAt: account.createdAt,
      deletedAt: account.deletedAt,
    });
  }
}
