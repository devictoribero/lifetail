import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtTokenGenerator } from '../services/JwtTokenGenerator';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/Public';

export type UserInContext = {
  accountId: string;
  id: string;
};

@Injectable()
export class AuthenticationRequired implements CanActivate {
  constructor(
    private readonly tokenGenerator: JwtTokenGenerator,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.isMarkedAsPublicRequest(context)) {
      return true;
    }

    const req = this.getRequest(context);
    const token = this.getAuthorizationToken(req);

    try {
      const payload = await this.tokenGenerator.verifyToken(token);
      const userInContext: UserInContext = {
        accountId: payload.sub,
        id: payload.userId,
      };

      // Add user information to the request
      req.user = userInContext;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private isMarkedAsPublicRequest(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    return isPublic;
  }

  private getRequest(context: ExecutionContext): any {
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    return req;
  }

  private getAuthorizationHeader(req: any): any {
    return req.headers.authorization;
  }

  private getAuthorizationToken(req: any): string {
    const authorizationHeader = this.getAuthorizationHeader(req);
    if (!authorizationHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }

    const [type, token] = authorizationHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    return token;
  }
}
