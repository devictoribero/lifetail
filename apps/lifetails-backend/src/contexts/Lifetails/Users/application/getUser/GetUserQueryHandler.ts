import { UUID } from 'src/contexts/Lifetails/Shared/domain/UUID';
import { User } from '../../domain/entities/User';
import { GetUserQuery } from './GetUserQuery';
import { UserNotFoundException } from '../../domain/exceptions/UserNotFoundException';
import { GetUserService } from '../../domain/services/GetUserService';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserQueryHandler {
  constructor(private readonly getUserService: GetUserService) {}

  async execute(query: GetUserQuery): Promise<User> {
    const accountId = new UUID(query.accountId);
    const user = await this.getUserService.execute(accountId);

    if (!user) {
      throw new UserNotFoundException(accountId.toString());
    }

    return user;
  }
}
