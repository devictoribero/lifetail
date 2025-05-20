import { Context, Query, Resolver } from '@nestjs/graphql';
import { GetUserQueryHandler } from 'src/contexts/Identity/User/application/getUser/GetUserQueryHandler';
import { GetUserQuery } from 'src/contexts/Identity/User/application/getUser/GetUserQuery';
import { UseGuards } from '@nestjs/common';
import { AuthenticationRequired } from 'src/server/graphql/Shared/guards/AuthenticationRequired';
import { User } from './User';

@Resolver()
@UseGuards(AuthenticationRequired)
export class MeGQLQuery {
  constructor(private readonly getUserQueryHandler: GetUserQueryHandler) {}

  @Query(() => User)
  async me(@Context() context: any): Promise<User> {
    const accountId = context.req.user.accountId;
    console.log(context.req.user);

    const query = new GetUserQuery(accountId);
    const user = await this.getUserQueryHandler.handle(query);

    const userPrimitives = user.toPrimitives();
    return {
      id: userPrimitives.id,
      accountId: userPrimitives.accountId,
      nickname: userPrimitives.nickname,
      preferredLanguage: userPrimitives.preferredLanguage,
      createdAt: userPrimitives.createdAt,
    };
  }
}
