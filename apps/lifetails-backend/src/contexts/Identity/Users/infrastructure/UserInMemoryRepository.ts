import { User } from '../domain/entities/User';
import { UserRepository } from '../domain/repositories/UserRepository';
import { UUID } from 'src/contexts/Shared/domain/UUID';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserInMemoryRepository implements UserRepository {
  private users: User[] = [];

  async save(user: User): Promise<void> {
    const existingUserIndex = this.users.findIndex(
      (u) => u.getId().toString() === user.getId().toString(),
    );

    if (existingUserIndex >= 0) {
      this.users[existingUserIndex] = user;
    } else {
      this.users.push(user);
    }
  }

  async getByAccountId(accountId: UUID): Promise<User | null> {
    const user = this.users.find((u) => u.getAccountId().toString() === accountId.toString());

    return user || null;
  }

  // Helper method for testing
  getAll(): User[] {
    return [...this.users];
  }

  // Helper method for testing
  clear(): void {
    this.users = [];
  }

  async getById(id: UUID): Promise<User | null> {
    const user = this.users.find((u) => u.getId().toString() === id.toString());

    return user || null;
  }
}
