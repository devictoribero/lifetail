import { UUID } from 'src/contexts/Shared/domain/UUID';
import { User } from '../../domain/entities/User';
import { GetUserQuery } from './GetUserQuery';
import { UserNotFoundException } from '../../domain/exceptions/UserNotFoundException';
import { GetUserService } from '../../domain/services/GetUserService';
import { Injectable } from '@nestjs/common';
import { QueryHandler } from 'src/contexts/Shared/domain/QueryHandler';

@Injectable()
export class GetUserQueryHandler implements QueryHandler<GetUserQuery, User> {
  constructor(private readonly getUserService: GetUserService) {}

  async handle(query: GetUserQuery): Promise<User> {
    const accountId = new UUID(query.accountId);
    const user = await this.getUserService.execute(accountId);

    if (!user) {
      throw new UserNotFoundException(accountId.toString());
    }

    return user;
  }
}
