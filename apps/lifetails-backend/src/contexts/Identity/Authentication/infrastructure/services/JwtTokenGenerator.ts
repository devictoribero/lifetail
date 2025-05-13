import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenGenerator } from '../../domain/TokenGenerator';
import { InvalidTokenException } from '../../domain/exceptions/InvalidTokenException';

export interface JwtPayload {
  sub: string; // accountId
  userId: string;
  email: string;
}

@Injectable()
export class JwtTokenGenerator implements TokenGenerator {
  constructor(
    private readonly jwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(payload: {
    accountId: string;
    userId: string;
    email: string;
  }): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: payload.accountId,
        userId: payload.userId,
        email: payload.email,
      },
      {
        secret: this.configService.get('jwt.secret'),
        expiresIn: this.configService.get('jwt.accessTokenExpiresIn'),
      },
    );
  }

  async generateRefreshToken(payload: {
    accountId: string;
    userId: string;
    email: string;
  }): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: payload.accountId,
        userId: payload.userId,
        email: payload.email,
      },
      {
        secret: this.configService.get('jwt.refreshSecret'),
        expiresIn: this.configService.get('jwt.refreshTokenExpiresIn'),
      },
    );
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get('jwt.secret'),
      });
    } catch (error) {
      throw new InvalidTokenException();
    }
  }
}
